import React, { memo } from 'react';
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

export default memo(function SearchBar({ onQueryChange }){
    return (
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
    )
})