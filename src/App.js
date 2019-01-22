import React, { Component } from 'react';
import {Snackbar} from "@material-ui/core";
import Search from "./components/Search";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {},
            error: false,
            show_error: false
        };

        this.handleErrorClose = this.handleErrorClose.bind(this);
    }

    handleErrorClose() {
        this.setState({show_error: false})
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
        ).catch(() => this.setState({ error: true, show_error: true }));
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
                <Search data={this.state.options} debounce={250} blacklist={['id', 'postId']} error={this.state.error}/>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.show_error}
                    autoHideDuration={6000}
                    onClose={this.handleErrorClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span>There was an error fetching the data!</span>}
                />
            </div>
        );
    }
}

export default App;
