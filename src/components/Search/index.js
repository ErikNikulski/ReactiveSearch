import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default class Search extends Component{

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: {title: '', results: []}
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    handleQueryChange(query) {
        this.setState((state, props) => ({
            query: query,
            results: this.search(query, props.data)
        }));
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    search(query, options, title='Search Results') {
        let res;
        query = query.toString().toLowerCase();

        if (Array.isArray(options)) {

            res = options.filter(option =>
                option.toString().toLowerCase().includes(query)
            );

        } else if (typeof options === 'object') {
            res = Object.entries(options).map(([key, option]) =>
                this.search(query, option, Search.capitalizeFirstLetter(key.toString()))
            );
        }

        return {title: title, results: res};
    }

    render() {
        let results;

        if (this.state.query.length >= 3) {
            results = <SearchResults results={this.state.results}/>;
        }

        return (
            <Fragment>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <SearchBar onQueryChange={this.handleQueryChange}/>
                    </Toolbar>
                </AppBar>
                {results}
            </Fragment>
        )
    }
}