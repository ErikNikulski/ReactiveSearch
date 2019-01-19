import React, { Component } from 'react';
import SearchResult from './SearchResult';

export default class SearchResults extends Component{
    render() {
        let results;

        if(this.props.results.results.every(el => typeof el === 'string')) {
            if (this.props.results.results.length !== 0) {
                results =
                    <ul>
                        {this.props.results.results.map(result =>
                            <SearchResult key={result} result={result}/>
                        )}
                    </ul>;
            } else {
                results = <p>No matches found!</p>;
            }
        } else {
            results = Object.entries(this.props.results.results).map(([, results]) =>
                <SearchResults key={results.title} results={results}/>
            );
        }

        return (
            <div>
                <p>{this.props.results.title}</p>
                {results}
            </div>
        )
    }
}