import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from "@material-ui/core";

const SearchResult = ({ result }) => (
    <ListItem>
        <ListItemText primary={result}/>
    </ListItem>
);

export default memo(SearchResult);

SearchResult.propTypes = {
    result: PropTypes.string.isRequired
};