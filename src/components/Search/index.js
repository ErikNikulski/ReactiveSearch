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
            results: []
        };

        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    handleQueryChange(query) {
        this.setState({query: query});
        this.search(query, this.state.options);
    }

    search(query, options) {
        options = options.map(option =>
            option.name
        );

        let res = options.filter(option =>
            option.includes(query)
        );

        this.setState({results: res});
    }

    // NOTE: Might want to do this in parent component
    getData() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/comments',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({options: data})
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
        console.log(this.props.data);
        this.getData();
    }

    render() {
        return (
            <div>
                <SearchBar onQueryChange={this.handleQueryChange}/>
                <SearchResults results={this.state.results}/>
            </div>
        )
    }
}