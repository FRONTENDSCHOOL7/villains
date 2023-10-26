import React, { useState } from "react";
import SearchBar from "../searchbar/searchbar";
import { useLocation } from "react-router";
import queryAtom from "../../store/queryAtom";
import { useRecoilState } from "recoil";

const Header = () => {
    const [query, setQuery] = useState("");
    const [queries, setQueries] = useRecoilState(queryAtom);
    
    const handleChangeQuery = (event) => {
        setQuery(event.target.value)
        setQueries(query);
    }
    //메인의 상태를 모르기 때문에 url을 사용하여 placeholder를 바꿔줌
    const { pathname } = useLocation();
    let placeholder;
    switch(pathname.split('/')[1]){
        case 'main':
            placeholder = `지하철역을 검색해주세요!`;
            break;
        case 'feed':
            placeholder = `유저를 검색해주세요`;
            break;
        default:
            placeholder = `검색어를 입력해주세요!`
    }

    return (
        <header>
        <SearchBar placeholder={placeholder} onChange={handleChangeQuery} value={query}/>
        </header>
    )
}

export default Header;