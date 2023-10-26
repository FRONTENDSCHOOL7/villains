import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import pageUrlConfig from "../../config/pageUrlConfig";
import styled from "styled-components";

/**@param list: 필터링된 데이터를 추가하기 */
const ListBox = ({ list }) => {
    const data = [];

    useEffect(()=>{
        data.push(list);
    }, [data.length]);

    return(
        <StyledBox>
            {
                data.map((d, index)=>{
                    return(
                        <Link to={pageUrlConfig[d?.dataset.link] ?? "/"}>
                            <div key={`list_box_${index}`}>
                                {data}
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