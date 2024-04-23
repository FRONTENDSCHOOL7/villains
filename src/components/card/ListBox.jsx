import React from "react";
import styled from "styled-components";
import queryAtom from "../../atoms/queryAtom";
import { useRecoilValue } from "recoil";
import queryFocusAtom from "../../atoms/queryFocusAtom";

/**@param list: 필터링된 데이터를 추가하기 */
const ListBox = ({ list, onClick }) => {
    return(
        <StyledBox>
            {
                list.map((d, index)=>{
                    return(
                        <StyledLinkBtn key={`list_${index}`} onClick={onClick} id={d[1]}>
                            {d[0]}
                        </StyledLinkBtn>
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


const StyledLinkBtn = styled.button`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #DBDBDB;
    padding: 20px;
    &:hover{
        background-color: #B1BCE6;
    }
`;

export default ListBox;