import React, { Component } from 'react';
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

export default class SearchResults extends Component{
    render() {
        let results;

        if(this.props.results.results.every(el => typeof el === 'string')) {
            if (this.props.results.results.length !== 0) {
                results =
                    this.props.results.results.map(result =>
                        <SearchResult key={result} result={result}/>
                    )
            } else {
                results =
                <ListItem>
                    <ListItemText primary={'No matches found!'}/>
                </ListItem>;
            }
        } else {
            results = Object.entries(this.props.results.results).map(([, results]) =>
                <SearchResults key={results.title} results={results}/>
            );
        }

        return (
            <List
                style={style.List}
                subheader={
                    <ListSubheader disableSticky={true} style={style.ListSubheader}>
                        {this.props.results.title}
                    </ListSubheader>
                }
            >
                {results}
            </List>
        )
    }
}