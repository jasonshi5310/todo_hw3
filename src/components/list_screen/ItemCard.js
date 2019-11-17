import React from 'react';
import {Button, Icon} from 'react-materialize';

class ItemCard extends React.Component {

    isComplete = () => {
        if (this.props.completed)
            return <div className='list_item_card_completed'> Completed
            </div>;
        else
            return <div className='list_item_card_not_completed'> Pending
            </div>;
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
                {this.isComplete()}
                <div className='list_item_card_toolbar'>
                    {/* {this.upArrow()}
                    {this.downArrow()}
                    {this.removeItem()} */}
                    <Button
                    floating
                    fab={{direction: 'left'}}
                    className="green"
                    style={{position:'absolute', height:"20px"}}
                    >
                        <Button floating icon={<Icon children="remove_circle_outline"/>} className="red" 
                        style={{left:'40px',right:'10px', bottom:"8px"}}
                        />
                        <Button floating icon={<Icon children="arrow_upward"/>} className="yellow darken-1" 
                        style={{left:'40px',right:'10px',bottom:"8px"}}
                        />
                        <Button floating icon={<Icon children="arrow_downward"/>} className="blue" 
                        style={{left:'40px',right:'10px', bottom:'8px'}}
                        />
                    </Button>
                </div>

            </div>
        );
    }
}
export default ItemCard;