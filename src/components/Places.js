import React, {Component } from 'react';

class Places extends Component{
    constructor(props){
        super(props);
        this.state ={
            visible: false
        }
    }
    render(){
        return(
        <div className="places">
        <li>
            <h3>{this.props.name}</h3>
        </li>

        </div>
        )
    }
}
export default Places;
