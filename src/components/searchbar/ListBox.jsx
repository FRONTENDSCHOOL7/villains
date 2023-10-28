import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import pageUrlConfig from "../../config/pageUrlConfig";
import styled from "styled-components";

/**@param list: 필터링된 데이터를 추가하기 */
const ListBox = ({ list }) => {

    return(
        <StyledBox>
            {
                list.map((d, index)=>{
                    return(
                        <Link  key={`list_box_${index}`} to={pageUrlConfig[d?.dataset?.link] ?? "/"}>
                            <div>
                                {d.stinNm}
                            </div>
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

export default ListBox;