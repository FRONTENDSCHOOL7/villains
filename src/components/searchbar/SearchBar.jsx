import React from "react";
import { useRecoilState } from "recoil";
import styled from 'styled-components'
import queryFocusAtom from "../../atoms/queryFocusAtom";

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
            {focus && <button onClick={handleClickButton}>뒤로가기</button>}
            <input placeholder={placeholder} value={value} onChange={onChange} onFocus={()=>{setFocus(true)}} onBlur={handleBlur}/>
            {!focus && <button onClick={handleClickButton}>검색</button>}
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