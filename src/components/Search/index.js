import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit'
import { AppBar, Toolbar } from '@material-ui/core';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default class Search extends Component{

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: {title: 'Search Results', results: []},
            data: {}
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    handleQueryChange(query) {
        this.setState((state, props) => ({
            query: query,
            results: this.search(query, this.state.data, props.title),
        }));
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    search(query, options) {
        return this.props.searchFunction ?
            this.props.searchFunction(query, options)
        :
            this.initSearch(query, options)
    }

    initSearch(query, options, title='') {
        let res;
        query = query.toString().toLowerCase();

        if (Array.isArray(options)) {

            res = options.filter(option =>
                option.toString().toLowerCase().includes(query)
            );

        } else if (typeof options === 'object') {
            res = Object.entries(options)
                .map(([key, option]) =>
                this.initSearch(query, option, Search.capitalizeFirstLetter(key.toString()))
            );
        }

        return {title: title || this.state.results.title, results: res};
    }

    static getDerivedStateFromProps(props, state) {
        return {data: omit(props.data, props.blacklist)}
    }

    render() {
        return (
            <Fragment>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <SearchBar onQueryChange={this.handleQueryChange} debounce={this.props.debounce}/>
                    </Toolbar>
                </AppBar>
                {this.state.query.length > 2 ?
                    <SearchResults results={this.state.results}/>
                :
                    undefined
                }
            </Fragment>
        )
    }
}

Search.defaultProps = {
    blacklist: [],
    debounce: 0,
    title: 'Search Results'
};

const dataShape = {
    key: PropTypes.arrayOf(PropTypes.string)
};

dataShape.key = PropTypes.arrayOf(
    PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape(dataShape)
    ])
);

Search.propTypes = {
    data: PropTypes.shape(dataShape).isRequired,
    debounce: PropTypes.number,
    blacklist: PropTypes.arrayOf(PropTypes.string),
    searchFunction: PropTypes.func
};