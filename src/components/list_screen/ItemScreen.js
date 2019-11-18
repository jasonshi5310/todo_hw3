import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemScreen extends React.Component {

    loadList = () => {
        this.props.history.goBack();
        window.currentItem = null;
    }

    submitNewItem = () => {
        let description = document.getElementById("item_description_textfield").value;
        let assignedTo = document.getElementById("item_assigned_to_textfield").value;
        let dueDate = document.getElementById("item_due_date_picker").value;
        let completed = document.getElementById("item_completed_checkbox").checked;
        if (description === "") description = "unknown";
        if (assignedTo === '') assignedTo = "unknown";
        if (dueDate === '') dueDate = null; 
        let listID = window.currentList.id;
        getFirestore().collection('todoLists').doc(listID).get().then(function(doc){
            let items = doc.data().items;
            if (window.currentItem===null) // add a new item
            {
                let todoItem =  {
                    "key": items.length+1,
                    "description": description,
                    "due_date": dueDate,
                    "assigned_to": assignedTo,
                    "completed": completed
                };
                items.push(todoItem);
            }
            else // edit a item
            {
                console.log(items.indexOf(window.currentItem))
                getFirestore().collection('todoLists').doc(listID).get('items').then(function(doc){
                    console.log(doc);
                })

            }
            getFirestore().collection("todoLists").doc(listID).update({
                items:items
            })
        })
        this.props.history.goBack();
        window.currentItem = null;
    }

    loadItem = () => {
        let item = window.currentItem;
        if (item!==null){
            console.log(item);
            let description = document.getElementById("item_description_textfield");
           let assignedTo = document.getElementById("item_assigned_to_textfield");
           let dueDate = document.getElementById("item_due_date_picker");
            let completed = document.getElementById("item_completed_checkbox");
            description.value = item.description;
            assignedTo.value = item.assigned_to;
            dueDate.value = item.due_date;
            completed.checked = item.completed;
        }
    }

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
                    <input type="text" id="item_description_textfield" defaultValue="unknown"/>
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id = "item_assigned_to_prompt">Assigned To:</span>
                    <input type="text" id="item_assigned_to_textfield" defaultValue="unknown"/>
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id="item_due_date_prompt">Due Date:</span>
                    <input type="date" id="item_due_date_picker" />
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id= "item_completed_prompt">Completed:</span>
                    <label id ='item_completed_label'><input type="checkbox" id='item_completed_checkbox'/>
                    <span></span></label>
                </div>
                <br/>
                <button id="item_form_submit_button"
                onClick={this.submitNewItem}
                >Submit</button>
                <button id="item_form_cancel_button"
                onClick={this.loadList}
                >Cancel</button>
            </div>
            </div> 
            
        )
    }
}


export default ItemScreen