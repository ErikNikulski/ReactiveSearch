import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export default class Search extends Component{

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: {title: "", results: []}
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    handleQueryChange(query) {
        this.setState({query: query});
        this.setState({results: this.search(query, this.props.data)});
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    search(query, options, title="Search Results") {
        let res;
        query = query.toString().toLowerCase();

        if (Array.isArray(options)) {

            res = options.filter(option =>
                option.toString().toLowerCase().includes(query)
            );

        } else if (typeof options === "object") {
            let self = this;
            res = Object.keys(options).map(function (k) {
                return self.search(query, options[k], Search.capitalizeFirstLetter(k.toString()));
            });
        }

        return {title: title, results: res};
    }

    render() {
        let results;

        if (this.state.query.length >= 3) {
            results = <SearchResults results={this.state.results}/>;
        }

        return (
            <div>
                <SearchBar onQueryChange={this.handleQueryChange}/>
                {results}
            </div>
        )
    }
}