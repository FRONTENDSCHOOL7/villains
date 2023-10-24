import React from "react";
import { useState } from "react";
import styled from 'styled-components'

const SearchBar = ({placeholder}) => {
    const [query, setQuery] = useState("");
    return(
        <StyledForm>
            <input placeholder={placeholder} value={query} onChange={(event)=>setQuery(event.target.value)}/>
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