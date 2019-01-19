import React, { Component } from 'react';
import $ from "jquery";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export default class Search extends Component{

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            options: [],
            results: {title: "", results: []}
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    handleQueryChange(query) {
        this.setState({query: query});
        this.setState({results: this.search(query, this.state.options)});
    }

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    search(query, options, title="Search Results") {
        let res;

        if (Array.isArray(options)) {

            res = options.filter(option =>
                option.includes(query)
            );

        } else if (typeof options === "object") {
            let self = this;
            res = Object.keys(options).map(function (k) {
                return self.search(query, options[k], Search.capitalizeFirstLetter(k.toString()));
            });
        }

        return {title: title, results: res};
    }

    friendlify(array) {
        // https://stackoverflow.com/a/29177205
        return array.reduce(function(acc, obj) {
            Object.keys(obj).forEach(function(k) {
                acc[k] = (acc[k] || []).concat(obj[k])
            });
            return acc
        },{})
    }

    // NOTE: Might want to do this in parent component
    getData() {
        let self = this;
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/comments',
            dataType: 'json',
            cache: false,
            success: function (data) {
                let options = self.friendlify(data);
                delete options.id;
                delete options.postId;
                this.setState({options: options})
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        })
    }

    componentWillMount() {
        this.getData();
    }

    componentDidMount() {
        this.getData();
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