import React from "react";
import { useState } from "react";
import styled from 'styled-components'

const SearchBar = ({placeholder, onChange, value}) => {

    return(
        <StyledForm>
            <input placeholder={placeholder} value={value} onChange={onChange}/>
            <button>검색</button>
        </StyledForm>
    )
}

const StyledForm = styled.form`
    display: flex;
    & * {
        margin: auto;
    }
    & input{
        flex-grow: 1;
    }
`;

export default SearchBar;