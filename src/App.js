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
    currentList: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
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
          delete={this.delete}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;