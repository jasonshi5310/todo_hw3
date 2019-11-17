import React from 'react';
import {Button, Icon} from 'react-materialize';
import {getFirestore} from 'redux-firestore';

class ItemCard extends React.Component {

    isComplete = (item) => {
        if (item.completed)
            return <div className='list_item_card_completed'> Completed
            </div>;
        else
            return <div className='list_item_card_not_completed'> Pending
            </div>;
    }

    removeItem = () => {
        console.log(this.props.index);
        let index = this.props.index;
        let listID = this.props.todoList.id;
        getFirestore().collection("todoLists").doc(listID).get().then(function(doc) {
            let items = doc.data().items;
            items.splice(index,1);
            getFirestore().collection("todoLists").doc(listID).update({
                items:items
            })
        });


    }

    moveUp = () => {
        console.log(this.props.index);
        let index = this.props.index;
        let listID = this.props.todoList.id;
        getFirestore().collection("todoLists").doc(listID).get().then(function(doc) {
            let items = doc.data().items;
            let temp = items[index-1];
            items[index-1]=items[index];
            items[index]=temp;
            getFirestore().collection("todoLists").doc(listID).update({
                items:items
            })
        });
        window.isTaskSorted = false;
        window.isStatusSorted = false;
        window.isDueDateSorted = false;

    }

    moveDown = () => {
        console.log(this.props.index);
        let index = this.props.index;
        let listID = this.props.todoList.id;
        getFirestore().collection("todoLists").doc(listID).get().then(function(doc) {
            let items = doc.data().items;
            let temp = items[index+1];
            items[index+1]=items[index];
            items[index]=temp;
            getFirestore().collection("todoLists").doc(listID).update({
                items:items
            })
        });
        window.isTaskSorted = false;
        window.isStatusSorted = false;
        window.isDueDateSorted = false;
    }

    isFirst = () => 
    {
        if (this.props.isFirst)
            return true;
        return false;
    }

    isLast = () => 
    {
        if (this.props.isLast)
            return true;
        return false;
    }

    render() {
        const { item } = this.props;
        return (
            <div className="list_item_card">
                {/* <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                </div> */}
                <div className='list_item_card_description'>
                    {item.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{item.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {item.due_date}
                </div>
                {this.isComplete(item)}
                <div
                >
                    <Button
                    floating
                    fab={{direction: 'left'}}
                    className="green"
                    style={{position:'absolute', height:"20px"}}
                    >
                        <Button floating icon={<Icon children="arrow_upward"/>} className="yellow darken-1" 
                        style={{left:'40px',right:'10px',bottom:"8px"}}
                        onClick = {() => this.moveUp()}
                        disabled = {this.isFirst()}
                        />
                        <Button floating icon={<Icon children="arrow_downward"/>} className="blue" 
                        style={{left:'40px',right:'10px', bottom:'8px'}}
                        disabled = {this.isLast()}
                        onClick = {() => this.moveDown()}
                        />
                        <Button floating icon={<Icon children="remove_circle_outline"/>} className="red" 
                        style={{left:'40px',right:'10px', bottom:"8px"}}
                        onClick = {() => this.removeItem()}
                        />
                    </Button>
                    
                </div>
            </div>
        );
    }
}
export default ItemCard;