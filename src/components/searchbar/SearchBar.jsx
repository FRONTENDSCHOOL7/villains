import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from 'styled-components'
import queryFocusAtom from "../../atoms/queryFocusAtom";
import ArrowImg from '../../assets/img/icon-arrow-left.svg';
import queryAtom from "../../atoms/queryAtom";
import { useNavigate } from "react-router";

const SearchBar = ({placeholder, onChange, value, onClick, backPath}) => {
    const [focus, setFocus] = useRecoilState(queryFocusAtom);
    const [query, setQuery] = useRecoilState(queryAtom);
    
    const [isBack, setIsBack] = useState(false);

    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate(`/${backPath}`);
        setIsBack(false);
      }
    
    const handleFocus = ()=>{
        setIsBack(true);
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
            {isBack && <button onClick={handleClickBack}><img src={ArrowImg} alt="뒤로가기" /></button>}
            <input placeholder={placeholder} value={value} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur}/>
            {!focus && <button onClick={handleClickButton}>검색</button>}
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