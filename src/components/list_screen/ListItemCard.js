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
    buildDisableUpButton = () =>{
        if(this.props.listItem.key == 0){
            return (<button id={"item_card_"+this.props.listItem.key+"item_up_button"}
                className={"list_item_card_button" + " " + "disabled"}
                disabled={true}>
                    <img src={require("../Up.png")}/>
                </button>)
        }else{
            return (<button id={"item_card_"+this.props.listItem.key+"item_up_button"}
            className="list_item_card_button"
            onClick={this.props.up.bind(this,this.props.listItem.key)}>
                <img src={require("../Up.png")}/>
            </button>)
        }
    }
    buildDisableDownButton = () => {
        if(this.props.listItem.key == this.props.items.length-1){
            return (
                <button id={"item_card_"+this.props.listItem.key+"item_down_button"}
                className={"list_item_card_button" + " " + "disabled"}
                disabled={true}>
                    <img src={require("../Down.png")}/>
                </button>
            )
        }else{
            return(<button id={"item_card_"+this.props.listItem.key+"item_down_button"}
            className="list_item_card_button"
            onClick={this.props.down.bind(this,this.props.listItem.key)}>
                <img src={require("../Down.png")}/>
            </button>)
        }
    }
    render() {
        return (
            <div className='list_item_card' onClick={this.props.edit.bind(this, this.props.listItem.key)}>
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
                
                {this.buildDisableUpButton()}
                {this.buildDisableDownButton()}
                
                <button id={"item_card_"+this.props.listItem.key+"item_delete_button"}
                className="list_item_card_button"
                onClick={this.props.deleteItem.bind(this,this.props.listItem.key)}>
                    <img src={require("../Close.png")}/>
                </button>
            </div>
        )
    }
}

export default ListItemCard
