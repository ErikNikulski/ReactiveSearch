import React, { Component } from 'react';

export default class SearchBar extends Component{

    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    handleQueryChange(e) {
        this.props.onQueryChange(e.target.value);
    }

    render() {
        return (
            <input type={'text'} placeholder={'Search...'} onChange={this.handleQueryChange} />
        )
    }
}