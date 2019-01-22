import React, { Component } from 'react';
import Search from "./components/Search";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {},
            error: null
        }
    }

    changeStructure = (array) =>
        // https://stackoverflow.com/a/29177205
        array.reduce((acc, obj) => {
            Object.keys(obj)
                .forEach((k) =>
                    acc[k] = (acc[k] || []).concat(obj[k])
            );
            return acc
        },{});

    getData() {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(json =>
            this.setState({
                options: this.changeStructure(json)
            })
        ).catch(error => this.setState({ error }));
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
                <Search data={this.state.options} blacklist={['id', 'postId']} error={this.state.error}/>
            </div>
        );
    }
}

export default App;
