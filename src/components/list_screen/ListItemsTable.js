import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div className='list_item_header_card'>
                    <div className="list_item_task_header" onClick={this.props.sortByTask}>Task</div>
                    <div className="list_item_due_date_header" onClick={this.props.sortByDuedate}>Due Date</div>
                    <div className="list_item_status_header" onClick={this.props.sortByStatus}>Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem} 
                            items={this.props.todoList.items}
                            up={this.props.up}
                            down={this.props.down}
                            deleteItem={this.props.deleteItem}
                            edit={this.props.edit}/>
                    ))
                }
                <button className="list_item_add_card" onClick={this.props.loadItem}> 
                    <img src={require("../AddItem.png")} />
                </button>
                
            </div>
        )
    }
}

export default ListItemsTable
