import React, { memo } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce'
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

const SearchBar = ({ onQueryChange, debounce: debounceTime }) => {
    const __debounce = debounceTime ? debounce : x => x;

    const handleQueryChange = event => {
        __debounce(value => onQueryChange(value), debounceTime)(event.target.value)
    };

    return (
        <InputSearchWrapper>
            <IconWrapper aria-label={'Search'}>
                <SearchIcon />
            </IconWrapper>
            <InputSearch
                placeholder={'Search...'}
                autoFocus={true}
                onChange={handleQueryChange}
            />
        </InputSearchWrapper>
    )
};

export default memo(SearchBar);

SearchBar.propTypes = {
    onQueryChange: PropTypes.func.isRequired,
    debounce: PropTypes.number
};