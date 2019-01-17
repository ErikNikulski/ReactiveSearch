import React, { Component } from 'react';
import SearchResult from "./SearchResult";

export default class SearchResults extends Component{
    render() {

        let results = this.props.results.map(result => {
            return (
                <SearchResult key={result} result={result}/>
            )
        });

        return (
            <ul>
                {results}
            </ul>
        )
    }
}