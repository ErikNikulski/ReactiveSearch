import React, { Component } from 'react';
import SearchResult from "./SearchResult";

export default class SearchResults extends Component{
    render() {
        let results;

        if(this.props.results.results.every(el => typeof el === "string")) {
            if (this.props.results.results.length !== 0) {
                let tmp = this.props.results.results.map(result => {
                    return (
                        <SearchResult key={result} result={result}/>
                    )
                });

                results = <ul>{tmp}</ul>;
            } else {
                results = <p>No matches found!</p>;
            }
        } else {
            let self = this;
            results = Object.keys(this.props.results.results).map(function (k) {
                return (
                    <SearchResults key={self.props.results.results[k].title} results={self.props.results.results[k]}/>
                );
            });
        }

        return (
            <div>
                <p>{this.props.results.title}</p>
                {results}
            </div>
        )
    }
}