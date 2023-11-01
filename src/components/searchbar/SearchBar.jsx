import React from "react";
import { useRecoilState } from "recoil";
import styled from 'styled-components'
import queryFocusAtom from "../../atoms/queryFocusAtom";
import ArrowImg from '../../assets/img/icon-arrow-left.svg';

const SearchBar = ({placeholder, onChange, value}) => {
    const [focus, setFocus] = useRecoilState(queryFocusAtom);

    const handleBlur = () => {
        setFocus(false);
    }

    const handleClickButton = (event) => {
        event.preventDefault();
        setFocus(false);
    }

    return(
        <StyledForm>
            {focus && <button onClick={handleClickButton}><img src={ArrowImg} alt="뒤로가기" /></button>}
            <input placeholder={placeholder} value={value} onChange={onChange} onFocus={()=>{setFocus(true)}} onBlur={handleBlur}/>
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