import React, { Component } from 'react';
import Search from "./components/Search";
import $ from 'jquery';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: []
        }
    }

    changeStructure(array) {
        // https://stackoverflow.com/a/29177205
        return array.reduce(function(acc, obj) {
            Object.keys(obj).forEach(function(k) {
                acc[k] = (acc[k] || []).concat(obj[k])
            });
            return acc
        },{})
    }

    getData() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/comments',
            dataType: 'json',
            cache: false,
            success: function (data) {
                let options = this.changeStructure(data);
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
        return (
            <div className='App'>
                <Search data={this.state.options}/>
            </div>
        );
    }
}

export default App;
