import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import jTPS from './jtps/jTPS.js';
import Transaction from './jtps/Transaction';

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

const ItemSortCriteria = {
  SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
  SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
  SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
  SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
  SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
  SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null,
    jtps: new jTPS()
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
    this.setState({jtps: new jTPS()});
    window.removeEventListener("keydown", this.windowEvent);
  }

  loadList = (todoListToLoad) => {
    window.addEventListener("keydown",this.windowEvent);  
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    this.setState({currentItem: null});
    let list =  [...this.state.todoLists.filter(todo => todo.key !== todoListToLoad.key)];
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
    window.removeEventListener("keydown", this.windowEvent);
    let item;
    if(itemToLoad == null){
      item = {
        "key": "-1",
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
    let oldList = JSON.parse(JSON.stringify(list));//
    list.name = name;
    if(name === ""){
      list.name = "unknown";
    }
    let newList = JSON.parse(JSON.stringify(list));//
    let trans = new Transaction(oldList, newList, list);//
    let jtps = this.state.jtps;//
    jtps.addTransaction(trans);//
    this.setState({jtps: jtps});//
    this.setState({currentList: list});
  }

  processChangeOwner = (owner) => {
    let list = this.state.currentList;
    let oldList = JSON.parse(JSON.stringify(list));//
    list.owner = owner;
    let newList = JSON.parse(JSON.stringify(list));//
    let trans = new Transaction(oldList, newList, list);//
    let jtps = this.state.jtps;//
    jtps.addTransaction(trans);//
    this.setState({jtps: jtps});//
    this.setState({currentList: list})
  }

  delete = (key) => {
    let list =  [...this.state.todoLists.filter(todo => todo.key !== key)]
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
    let oldList = JSON.parse(JSON.stringify(todoList));//
    let descriptionT = document.getElementById("item_description_textfield");
    newItem.description = descriptionT.value;
    let assignedToT = document.getElementById("item_assigned_to_textfield");
    newItem.assigned_to = assignedToT.value;
    let dueDateT = document.getElementById("item_due_date_picker");
    newItem.due_date = dueDateT.value;
    let completed = document.getElementById("item_completed_checkbox");
    newItem.completed = completed.checked;
    if(newItem.key === "-1"){//create new item
      todoList.items.push(newItem);
      newItem.key = "" + (todoList.items.length - 1);
      this.setState({currentList: todoList});
      this.loadList(this.state.currentList);
    }else{
      this.setState({currentList: todoList});
      this.loadList(this.state.currentList);
    }
    let newList = JSON.parse(JSON.stringify(todoList));//
    let trans = new Transaction(oldList, newList, todoList);//
    let jtps = this.state.jtps;//
    jtps.addTransaction(trans);//
    this.setState({jtps: jtps});//
  }
  
  up = (key,ev) => {
    let todoList = this.state.currentList;
    let oldList = JSON.parse(JSON.stringify(todoList));//
    let items = todoList.items;
    let index = Number(key);
    let item = items[index];
    items.splice(index, 1);
    items.splice(index-1, 0, item);
    this.fixKey(items);
    ev.stopPropagation();
    let newList = JSON.parse(JSON.stringify(todoList));//
    let trans = new Transaction(oldList, newList, todoList);//
    let jtps = this.state.jtps;//
    jtps.addTransaction(trans);//
    console.log(jtps.transactions);
    this.setState({jtps: jtps});//
    this.setState({currentList: todoList});
  }

  down = (key,ev) => {
    let todoList = this.state.currentList;
    let oldList = JSON.parse(JSON.stringify(todoList));//
    let items = todoList.items;
    let index = Number(key);
    let item = items[index];
    items.splice(index, 1);
    items.splice(index+1, 0, item);
    this.fixKey(items);
    ev.stopPropagation();
    let newList = JSON.parse(JSON.stringify(todoList));//
    let trans = new Transaction(oldList, newList, todoList);//
    let jtps = this.state.jtps;//
    jtps.addTransaction(trans);//
    this.setState({jtps: jtps});//
    this.setState({currentList: todoList});
  }

  deleteItem = (key,ev) => {
    let todoList = this.state.currentList;
    let oldList = JSON.parse(JSON.stringify(todoList));//
    let items = todoList.items;
    let index = Number(key);
    items.splice(index, 1);
    this.fixKey(items);
    ev.stopPropagation();
    let newList = JSON.parse(JSON.stringify(todoList));//
    let trans = new Transaction(oldList, newList, todoList);//
    let jtps = this.state.jtps;//
    jtps.addTransaction(trans);//
    this.setState({jtps: jtps});//
    this.setState({currentList: todoList});
  }

  edit = (key) => {
    let items = this.state.currentList.items;
    let index = Number(key);
    this.loadItem(items[index]);
  }

  /**
     * This method sorts the todo list items according to the provided sorting criteria.
     * 
     * @param {ItemSortCriteria} sortingCriteria Sorting criteria to use.
     */
  sortTasks = (sortingCriteria) => {
    let todoList = this.state.currentList;
    todoList.currentItemSortCriteria = sortingCriteria;
    todoList.items.sort(this.compare);
    this.fixKey(todoList.items);
    this.setState({currentList: todoList});
  }

  /**
   * This method tests to see if the current sorting criteria is the same as the argument.
   * 
   * @param {ItemSortCriteria} testCriteria Criteria to test for.
   */
  isCurrentItemSortCriteria = (testCriteria) => {
    let todoList = this.state.currentList;
    return todoList.currentItemSortCriteria === testCriteria;
  }

  /**
   * This method compares two items for the purpose of sorting according to what
   * is currently set as the current sorting criteria.
   * 
   * @param {TodoListItem} item1 First item to compare.
   * @param {TodoListItem} item2 Second item to compare.
   */
  compare = (item1, item2) => {

      // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
      if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
          || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)
          || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
          let temp = item1;
          item1 = item2;
          item2 = temp;
      }
      // SORT BY ITEM DESCRIPTION
      if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
          || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
          if (item1.description < item2.description)
              return -1;
          else if (item1.description > item2.description)
              return 1;
          else
              return 0;
      }
      //sort by due dates
      else if(this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
          || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)){
          if(item1.due_date == null && item2.due_date != null){
              return -1;
          }
          else if(item2.due_date == null && item1.due_date != null){
              return 1;
          }
          else if(item1.due_date == null && item2.due_date == null){
              return 0;
          }
          else if(item1.due_date < item2.due_date)
              return -1
          else if(item1.due_date > item2.due_date)
              return 1;
          else
              return 0;
      }
      // SORT BY COMPLETED
      else {
          if (item1.completed < item2.completed)
              return -1;
          else if (item1.completed > item2.completed)
              return 1;
          else
              return 0;
      }
  }

  sortByTask = () =>{
    // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
    if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
      this.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
    }
    // ALL OTHER CASES SORT BY INCREASING
    else {
      this.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
    }
  }

  sortByDuedate = () => {
    if(this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)){
      this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
    }
    else{
      this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
    }
  }

  sortByStatus = () => {
    // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
    if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
      this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
    }
    // ALL OTHER CASES SORT BY INCRASING
    else {
      this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
    }
  }

  un = () => {
    console.log("why");
    let jtps = this.state.jtps;
    let trans = jtps.peekUndo();
    let list = this.state.currentList;
    jtps.undoTransaction();
    if(trans !== null){
      let temp = trans.current; //get the current list of the transaction
      this.copyList(list,temp);
    }
    this.setState({currentList: list});
    document.getElementById("list_name_textfield").value = list.name;
    document.getElementById("list_owner_textfield").value = list.owner;
  }

  re = () => {
    let jtps = this.state.jtps;
    let list = this.state.currentList;
    let trans = jtps.peekDo();
    jtps.doTransaction();
    if(trans !== null){
      let temp = trans.current; //get the current list of the transaction
      this.copyList(list,temp);
    }
    this.setState({currentList: list});
    document.getElementById("list_name_textfield").value = list.name;
    document.getElementById("list_owner_textfield").value = list.owner;
  }

  copyList = (list1, list2) =>{
    list1.name = list2.name;
    list1.owner = list2.owner;
    list1.items = list2.items;
  }

  windowEvent = (e) =>{
    if(e.ctrlKey && (e.keyCode == 89 || e.keyCode == 121)){
      e.preventDefault();
      this.re();
    }
    else if(e.ctrlKey && (e.keyCode == 90 || e.keyCode == 122)){
      e.preventDefault();
      this.un();
    }
  }
  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        createNewTodo={this.createNewTodo.bind(this)}/>
      case AppScreen.LIST_SCREEN:  
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} 
          changeName={this.processChangeName}
          changeOwner={this.processChangeOwner}
          delete={this.delete}
          loadItem={this.loadItem.bind(this, null)}
          up={this.up}
          down={this.down}
          deleteItem={this.deleteItem}
          edit={this.edit}
          sortByTask={this.sortByTask}
          sortByDuedate={this.sortByDuedate}
          sortByStatus={this.sortByStatus}/>;
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