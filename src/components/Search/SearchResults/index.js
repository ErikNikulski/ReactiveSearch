import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import SearchResult from './SearchResult';

const style = {
    List: {
        marginLeft: '20px'
    },
    ListSubheader: {
        fontSize: '1.2rem'
    }
};

const SearchResults = ({ results: { title, results } }) => {
    let res;

    if(results.every(el => typeof el === 'string')) {
        if (results.length !== 0) {
            res =
                results.map(result =>
                    <SearchResult key={result} result={result}/>
                )
        } else {
            res =
            <ListItem>
                <ListItemText primary={'No matches found!'}/>
            </ListItem>;
        }
    } else {
        res = Object.entries(results).map(([, results]) =>
            <SearchResults key={results.title} results={results}/>
        );
    }

    return (
        <List
            style={style.List}
            subheader={
                <ListSubheader disableSticky={true} style={style.ListSubheader}>
                    {title}
                </ListSubheader>
            }
        >
            {res}
        </List>
    )
};

export default memo(SearchResults);

const resultsShape = {
    title: PropTypes.string
};

resultsShape.results = PropTypes.arrayOf(
    PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape(resultsShape)
    ])
);

SearchResults.propTypes = {
    title: PropTypes.string,
    results: PropTypes.shape(resultsShape).isRequired
};