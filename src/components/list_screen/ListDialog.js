import React, { Component } from 'react'

export class ListDialog extends Component{
    
    render(){
        return (
            <React.Fragment>
            <div id="the_block" className="not_visible"></div>
            <div id="modal_yes_no_dialog" className="not_visible">
                <div>Delete list?</div>
                <br></br>
                <div id="dialog_message">Are you sure you want to delete this list?</div>
                <br></br>
                <button id="dialog_yes_button" onClick={this.props.delete}>Yes</button>
                <button id="dialog_no_button" onClick={this.props.hide}>No</button>
                <br></br>
                <br></br>
                <div>The list will not be retreivable.</div>
            </div>
            </React.Fragment>
        )
        
        
    }
}

export default ListDialog