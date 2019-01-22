import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Input, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const InputSearchWrapper = styled.div`
    padding: 0 4px;
    display: flex;
    align-items: center;
    width: 400px;
    margin-left: 8px;
    border-radius: 3px;
`;

const InputSearch = styled(Input)`
    flex: 1;
`;

const IconWrapper = styled(IconButton)`
    padding: 10px;
`;

const SearchBar = ({ onQueryChange }) => (
        <InputSearchWrapper>
            <IconWrapper aria-label={'Search'}>
                <SearchIcon />
            </IconWrapper>
            <InputSearch
                placeholder={'Search...'}
                autoFocus={true}
                onChange={(e) => onQueryChange(e.target.value)}
            />
        </InputSearchWrapper>
);

export default memo(SearchBar);

SearchBar.propTypes = {
    onQueryChange: PropTypes.func.isRequired
};