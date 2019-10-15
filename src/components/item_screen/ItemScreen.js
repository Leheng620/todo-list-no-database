import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    getDiscription = () => {
        return this.props.todoItem.description;
    }

    getAssignTo = () => {
        return this.props.todoItem.assigned_to;
    }

    getDueDate = () => {
        return this.props.todoItem.due_date;
    }

    getIsCompleted = () => {
        return this.props.todoItem.completed;
    }
    render() {
        return (
            <div>
                <div id='todo_item_edit'>
                    <div id='item_form_container'>
                        <div id='item_heading'>Item</div>
                        <div id='item_description_prompt' className='item_prompt'>Description:</div>
                        <input type="text" id='item_description_textfield' className="item_input" defaultValue={this.getDiscription()}/>
                        <div id='item_assigned_to_prompt' className='item_prompt'>Assigned To:</div>
                        <input type='txet' id='item_assigned_to_textfield' className="item_input" defaultValue={this.getAssignTo()}/>
                        <div id='item_due_date_prompt' className='item_prompt'>Due Date:</div>
                        <input type='date' id='item_due_date_picker' className="item_input" defaultValue={this.getDueDate()}/>
                        <div id='item_completed_prompt' className='item_prompt'>Completed:</div>
                        <input type='checkbox' id='item_completed_checkbox' className="item_input" defaultChecked={this.getIsCompleted()}/>
                    </div>
                    <div id='item_form_button'>
                        <button id='item_form_submit_button' onClick={this.props.createNewItem}>Submit</button>
                        <button id='item_form_cancel_button' onClick={this.props.loadList}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
