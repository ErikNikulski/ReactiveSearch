import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
            results: this.search(query, props.data, 'Search Results', props.blacklist)
        }));
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    search(query, options, title='Search Results', blacklist=[]) {
        let res;
        query = query.toString().toLowerCase();

        if (Array.isArray(options)) {

            res = options.filter(option =>
                option.toString().toLowerCase().includes(query)
            );

        } else if (typeof options === 'object') {
            res = Object.entries(options)
                .filter(([key]) => !blacklist.includes(key))
                .map(([key, option]) =>
                this.search(query, option, Search.capitalizeFirstLetter(key.toString()), blacklist)
            );
        }

        return {title: title, results: res};
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
    debounce: 0
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
    blacklist: PropTypes.arrayOf(PropTypes.string)
};