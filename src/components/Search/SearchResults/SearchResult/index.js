import React, { Component } from 'react';

export default class SearchResult extends Component{
    render() {
        return (
            <li>{this.props.result}</li>
        )
    }
}