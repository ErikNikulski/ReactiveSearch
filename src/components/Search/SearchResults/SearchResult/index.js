import React, { memo } from 'react';
import { ListItem, ListItemText } from "@material-ui/core";

const SearchResult = ({ result }) => (
    <ListItem>
        <ListItemText primary={result}/>
    </ListItem>
);

export default memo(SearchResult)