import React, { Component } from 'react'

export class ListItemCard extends Component {
    showCompleted = (isCompleted) =>{
        if(isCompleted){
            return (<div className='list_item_card_completed'>
                    Completed
                </div>)
        }
        else{
            return (<div className='list_item_card_not_completed'>
                Pending
            </div>)
        }
    }
    render() {
        return (
            <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                
                {this.showCompleted(this.props.listItem.completed)}
                
            </div>
        )
    }
}

export default ListItemCard
