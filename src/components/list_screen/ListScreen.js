import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
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
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
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
                <ListItemsTable todoList={this.props.todoList} />
            </div>
        )
    }
}

export default ListScreen
