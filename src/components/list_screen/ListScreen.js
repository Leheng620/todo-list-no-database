import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import ListDialog from './ListDialog'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    state = {
        show: false
    }
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }
    //Read input and process changing the name of the list
    onChangeName = (e) =>{
        this.props.changeName(e.target.value);
    }
    //Read input and process changing the owner of the list
    onChangeOwner = (e) =>{
        this.props.changeOwner(e.target.value);
    }
    show = () => {
        let dialog = document.getElementById("modal_yes_no_dialog");
        let block = document.getElementById("the_block");
        dialog.classList.remove("not_visible");
        block.classList.remove("not_visible");
        dialog.classList.add("is_visible");
        block.classList.add("is_visible");
        dialog.classList.remove("animation_out");
        dialog.classList.add("animation_in");
    }
    hide = () => {
        let d = document.getElementById("modal_yes_no_dialog");
        d.classList.remove("animation_in");
        d.classList.add("animation_out");
        let block = document.getElementById("the_block");
        block.classList.remove("is_visible");
        block.classList.add("not_visible");
        setTimeout(function(){
            d.classList.remove("is_visible");
            d.classList.add("not_visible");
        }, 100);
        
    }
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash show={this.show.bind(this)} />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            onChange={this.onChangeName}
                            defaultValue={this.getListName()} 
                            type="text" 
                            id="list_name_textfield"
                             />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield" 
                            onChange={this.onChangeOwner}/>
                    </div>
                </div>
                <ListItemsTable 
                todoList={this.props.todoList} 
                loadItem={this.props.loadItem}
                up={this.props.up}
                down={this.props.down}
                deleteItem={this.props.deleteItem}
                edit={this.props.edit}
                sortByTask={this.props.sortByTask}
                sortByDuedate={this.props.sortByDuedate}
                sortByStatus={this.props.sortByStatus}/>
                <ListDialog hide={this.hide.bind(this)} delete={this.props.delete.bind(this,this.props.todoList.key)}/>
            </div>
        )
    }
}

export default ListScreen
