import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    this.setState({currentItem: null});
    let list =  [...this.state.todoLists.filter(todo => todo.key != todoListToLoad.key)];
    for(let i = 0; i < list.length; i++){
      if(list[i].key < todoListToLoad.key){
        let n = Number(list[i].key);
        n += 1;
        list[i].key = "" + n;
      }
    }
    todoListToLoad.key = "0";
    this.setState({todoLists: [todoListToLoad, ...list]})
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  loadItem = (itemToLoad) => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    let item;
    if(itemToLoad == null){
      item = {
        "key": "0",
        "description": "",
        "due_date": "",
        "assigned_to": "",
        "completed": false
      }
    }else{
      item = itemToLoad;
    }
    this.setState({currentItem: item});

  }
  processChangeName = (name) => {
    let list = this.state.currentList;
    list.name = name;
    this.setState({currentList: list})
  }

  processChangeOwner = (owner) => {
    let list = this.state.currentList;
    list.owner = owner;
    this.setState({currentList: list})
  }

  delete = (key) => {
    let list =  [...this.state.todoLists.filter(todo => todo.key != key)]
    // for(let i = 0; i < list.length; i++){
    //   if(list[i].key > key){
    //     let n = Number(list[i].key);
    //     n -= 1;
    //     list[i].key = "" + n;
    //   }
    // }
    this.fixKey(list);
    this.setState({todoLists: list})
    this.goHome()
  }

  fixKey = (list) => {
    for(let i = 0; i < list.length; i++){
      list[i].key = "" + i;
    }
  }

  createNewTodo = () => {
    let list = this.state.todoLists;
    let newTodo = {
      "key": 0,
      "name": "unknown",
      "owner": "unknown",
      "items": []
    }
    list.unshift(newTodo);
    this.fixKey(list);
    this.setState({todoLists: list})
    this.loadList(newTodo);
  }

  createNewItem = () => {
    let todoList = this.state.currentList;
    let newItem = this.state.currentItem;
    let descriptionT = document.getElementById("item_description_textfield");
    newItem.description = descriptionT.value;
    let assignedToT = document.getElementById("item_assigned_to_textfield");
    newItem.assigned_to = assignedToT.value;
    let dueDateT = document.getElementById("item_due_date_picker");
    newItem.due_date = dueDateT.value;
    let completed = document.getElementById("item_completed_checkbox")
    newItem.completed = completed.checked;

    todoList.items.push(newItem);
    newItem.key = "" + (todoList.items.length - 1);
    this.setState({currentList: todoList})
    this.loadList(this.state.currentList);
  }
  
  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        createNewTodo={this.createNewTodo.bind(this)}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} 
          changeName={this.processChangeName}
          changeOwner={this.processChangeOwner}
          delete={this.delete}
          loadItem={this.loadItem.bind(this, null)}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          todoItem={this.state.currentItem}
          loadList={this.loadList.bind(this,this.state.currentList)}
          createNewItem={this.createNewItem.bind(this, this.state.currentItem)}/>;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;