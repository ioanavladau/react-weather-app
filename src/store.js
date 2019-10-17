import React from 'react';

import { EventEmitter } from 'events'; // pre-built

export default class Store extends React.Component {
    constructor(props) {
        super(props);

        this.eventEmitter = new EventEmitter();

        // main app state
        this.state = {
            appName: "Weather Up"
        }
    }

    render() {
        return React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { 
                ...this.state, 
                eventEmitter: this.eventEmitter 
            });
        });
    }
}