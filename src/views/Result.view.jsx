import { useLocation, useParams } from "react-router";
import getSubTime from "../api/getSubTime.api";
import queryAtom from "../atoms/queryAtom";
import PageTemplate from "../components/PageTemplate"
import { useEffect, useState } from "react";
import styled from "styled-components";

const ResultPage = () => {
    const location = useLocation();
    const index = 5;
    const stationNum = location.pathname.split('/')[2];
    const [rowInfo, setRowInfo] = useState([]);
    const [reqCount, setReqCount] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        if(count === reqCount && count != 0){
            const sortedInfo = rowInfo.sort();
            console.log(sortedInfo);
        }else{
        getSubTime(index*count, index*(count+1)-1, stationNum, 1, 1)
        .then((res)=>{
            const access = res.data.SearchSTNTimeTableByIDService;
            const status = access.RESULT.CODE;
            if(status != 'INFO-000') throw access.RESULT.MESSAGE;
            const length = +access.list_total_count;
            setReqCount(Math.ceil(length/index));
            setCount(prev=>prev+1);
            if(count<=reqCount){
                access.row.map((info, index)=>{
                    setRowInfo([...rowInfo, [info.ARRIVETIME, info.TRAIN_NO]]);
                })
            }
            
        }).catch((error)=>{
            console.error(error);
        });
    }
    }, [count])
    


    return(
        <PageTemplate>
            {
                rowInfo.map((info, index)=>{
                    return (
                    <div key={index}>
                        <StyledTag aria-label="지하철 번호">{info[1]}</StyledTag>
                        {info[0]}
                    </div>
                    )
                })
            }
        </PageTemplate>
    )
}

export default ResultPage;

const StyledTag = styled.span`
    background-color: #3C58C1;
    color: white;
    border-radius: 9999px;
    padding: 0.5em 1em;
`;