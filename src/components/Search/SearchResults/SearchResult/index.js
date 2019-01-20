import React, { Component } from 'react';
import { ListItem, ListItemText } from "@material-ui/core";

export default class SearchResult extends Component{
    render() {
        return (
            <ListItem>
                <ListItemText primary={this.props.result}/>
            </ListItem>
        )
    }
}