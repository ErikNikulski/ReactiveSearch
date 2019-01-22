import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Snackbar } from '@material-ui/core';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default class Search extends Component{

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: {title: '', results: []},
            error_open: false
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleErrorClose = this.handleErrorClose.bind(this);
    }

    handleQueryChange(query) {
        this.setState((state, props) => ({
            query: query,
            results: this.search(query, props.data, 'Search Results', props.blacklist)
        }));
    }

    handleErrorClose() {
        this.setState({error_open: false})
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
                this.search(query, option, Search.capitalizeFirstLetter(key.toString()))
            );
        }

        return {title: title, results: res};
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.error !== this.state.error_open) {
            this.setState({error_open: nextProps.error})
        }
    }

    render() {
        return (
            <Fragment>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <SearchBar onQueryChange={this.handleQueryChange}/>
                    </Toolbar>
                </AppBar>
                {this.state.query.length > 2 ?
                    <SearchResults results={this.state.results}/>
                :
                    undefined
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.error_open}
                    autoHideDuration={6000}
                    onClose={this.handleErrorClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span>There was an error fetching the data!</span>}
                />
            </Fragment>
        )
    }
}

Search.defaultProps = {
    blacklist: []
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
    blacklist: PropTypes.arrayOf(PropTypes.string)
};