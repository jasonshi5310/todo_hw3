import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import Collection from 'react-materialize/lib/Collection';
import {checkbox} from 'react-materialize';
import { hidden } from 'ansi-colors';

class ItemScreen extends React.Component {
    render() {
        return (
            <div id="add_new_item_page">
            <div id="add_new_item_dialog">
                <div className = "add_new_item_header">
                    <span>Item</span>
                </div>
                <br/>
                <br/>
                <div className = "add_new_item_header">
                    <span id= "item_description_prompt">Description:</span>
                    <input type="text" id="item_description_textfield" />
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id = "item_assigned_to_prompt">Assigned To:</span>
                    <input type="text" id="item_assigned_to_textfield" />
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id="item_due_date_prompt">Due Date:</span>
                    <input type="date" id="item_due_date_picker" />
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id= "item_completed_prompt">Completed:</span>
                    <checkbox id="item_completed_checkbox" />
                </div>
                <br/>
                <button id="item_form_submit_button"
                //onClick={this.props.submitNewItem.bind(this)}
                >Submit</button>
                <button id="item_form_cancel_button"
                //onClick={this.props.loadList}
                >Cancel</button>
            </div>
    
            </div> 
        )
    }
}


export default ItemScreen