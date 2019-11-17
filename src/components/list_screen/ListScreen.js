import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    ifClicked = false;

    setNewTime = (todoList) => {
        getFirestore().collection("todoLists").doc(todoList.id).update({
            time: Date.now()
        }).then(() => {
            console.log("New Time Set");
        }).catch((err) => {
            console.log(err);
        });
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleNameChange = (e) => {
        const list = getFirestore().collection("todoLists").doc(this.props.todoList.id);
        list.update({
            name: e.target.value
        })
    }

    handleOwnerChange = (e) => {
        const list = getFirestore().collection("todoLists").doc(this.props.todoList.id);
        list.update({
            owner: e.target.value
        })
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList){
	        return <React.Fragment />
        }
        if (!this.ifClicked){
            this.setNewTime(todoList);
            this.ifClicked = true;
        }
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div id="list_trash" onClick={this.showDeleteListDialog}>&#128465;</div>
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleNameChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleOwnerChange} defaultValue={todoList.owner} />
                </div>

                <div className="list_item_header_card">
                <div className="list_item_task_header"
                //onClick={this.props.sortTasks.bind(this, "task")}
                >
                    Task</div>
                <div className="list_item_due_date_header"
                //onClick={this.props.sortTasks.bind(this, "dueDate")}
                >
                    Due Date</div>
                <div className="list_item_status_header"
                //onClick={this.props.sortTasks.bind(this, "status")}
                >
                    Status</div>
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList) { todoList.id = id; }
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);