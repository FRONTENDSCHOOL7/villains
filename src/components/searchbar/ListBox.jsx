import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import pageUrlConfig from "../../config/pageUrlConfig";
import styled from "styled-components";
import queryAtom from "../../atoms/queryAtom";
import { useRecoilValue } from "recoil";

/**@param list: 필터링된 데이터를 추가하기 */
const ListBox = ({ list }) => {
    const query = useRecoilValue(queryAtom);
    return(
        <StyledBox>
            {
                list.map((d, index)=>{
                    return(
                        <Link  key={`list_box_${index}`} to={`${pageUrlConfig.resultPage}/${query}`}>
                            <StyledLinkBox>
                                {d[0]}
                            </StyledLinkBox>
                        </Link>
                    )
                })
            }
        </StyledBox>
    )
}


const StyledBox = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
`;


const StyledLinkBox = styled.div`
    height: 60px;
    border-bottom: 1px solid #DBDBDB;
    padding: 20px;
    &:hover{
        background-color: #B1BCE6;
    }
`;

export default ListBox;