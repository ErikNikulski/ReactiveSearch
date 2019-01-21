import React, { memo } from 'react';
import { ListItem, ListItemText } from "@material-ui/core";

export default memo(function SearchResult({ result }) {
    return (
        <ListItem>
            <ListItemText primary={result}/>
        </ListItem>
    )
})