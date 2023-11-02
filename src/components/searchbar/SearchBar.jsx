import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from 'styled-components'
import queryFocusAtom from "../../atoms/queryFocusAtom";
import queryAtom from "../../atoms/queryAtom";

const SearchBar = ({placeholder, onChange, value}) => {
    const [focus, setFocus] = useRecoilState(queryFocusAtom);
    const [query, setQuery] = useRecoilState(queryAtom);
    
    
    const handleFocus = ()=>{
        setFocus(true);
    }
    const handleBlur = () => {
        setFocus(false);
    }

    const handleClickButton = (event) => {
        event.preventDefault();
        setQuery(query);
    }
    
    return(
        <StyledForm>
            <input placeholder={placeholder} value={value} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur}/>
            <button onClick={handleClickButton}>검색</button>
        </StyledForm>
    )
}

const StyledForm = styled.form`
    display: flex;
    height: 100%;
    width: 100%;
    gap: 20px;
    & * {
        margin: auto;
    }
    & input{
        flex-grow: 1;
        height: 100%;
        border-radius: 9999px;
        border: none;
        background: #F4F4F4;
        padding: 8px 16px;
    }
`;

export default SearchBar;