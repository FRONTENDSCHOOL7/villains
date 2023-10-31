import { useLocation, useNavigate, useParams } from "react-router";
import getSubTime from "../api/getSubTime.api";

import PageTemplate from "../components/PageTemplate"
import { useEffect, useState } from "react";
import styled from "styled-components";

import holiday from '../database/2023-2024-holiday.json';
import { useRecoilValue } from "recoil";
import queryAtom from "../atoms/queryAtom";
import queryFocusAtom from "../atoms/queryFocusAtom";
import pageUrlConfig from "../config/pageUrlConfig";

const ResultPage = () => {
    const {stationId} = useParams();
    const query = useRecoilValue(queryAtom);
    const title = query;
    const focus = useRecoilValue(queryFocusAtom);
    
    // const navigate = useNavigate();
    // useEffect(()=>{
    //     if(focus) navigate(`${pageUrlConfig.homePage}`);
    // }, [focus])



    const [rowInfo, setRowInfo] = useState([]);
    const [reqCount, setReqCount] = useState(0);
    const [count, setCount] = useState(0);
    const [day, setDay] = useState(1);
    
    useEffect(()=>{
        setRowInfo([]);
        setCount(0);
    },[stationId])
    
    //TODO: 사용자 위치 정보 가져와서 시간에 맞게 시간표 조회하기
    useEffect(()=>{
        const userDate = new Date();
        const today = userDate.getDay();// 0: 일요일 ~ 6: 토요일
        const date = userDate.getDate();
        const month = userDate.getMonth() + 1;
        const year = userDate.getFullYear();
        
        switch(today){
            case 6:
                setDay(2);
                break;
            case 0:
                setDay(3);
                break;
            default:
                setDay(1);
                break;
        }

        if(holiday.holiday.includes(`${year}-${month}-${date}`)){
            setDay(3);
        }
    }, [])
    

    
    //TODO(보류): 이미 검색한 기록이 있다면 리코일을 사용하여 불러오기
    const index = 5;
    useEffect(()=>{
        rowInfo.sort();
        getSubTime(index*count, index*(count+1)-1, stationId, day, 1)
        .then((res)=>{
            const access = res.data.SearchSTNTimeTableByIDService;
            const status = access.RESULT.CODE;
            if(status != 'INFO-000') throw access.RESULT.MESSAGE;
            const length = +access.list_total_count;
            setReqCount(Math.ceil(length/index));
            if(count<=reqCount){
                access.row.map((info, index)=>{
                    rowInfo.push([info.ARRIVETIME,  info.TRAIN_NO, info.SUBWAYSNAME, info.SUBWAYENAME]);
                })
            }
            setCount(prev=>prev+1);
    }).catch((error)=>{
        console.error(error);
    });
    }, [count, stationId])

    return(
        <PageTemplate>
            <StyledLinkBtn>{title}</StyledLinkBtn>
            <ul>
            {
                rowInfo.map((info, index)=>{
                    return (
                    <StyledList key={index}>
                        <Time>{info[0]}</Time>
                        <Station>{info[2]} ➡️ {info[3]}</Station>
                        <StyledTag aria-label="지하철 번호">{info[1]}</StyledTag>
                    </StyledList>
                    )
                })
            }
            </ul>
        </PageTemplate>
    )
}

export default ResultPage;

const StyledLinkBtn = styled.button`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #DBDBDB;
    padding: 20px;
    &:hover{
        background-color: #B1BCE6;
    }
`;

const StyledList = styled.li`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #DBDBDB;
    font-size: 16px;
    font-weight: 500;
`

const Time = styled.span`
    margin-right: 8px;
`
const Station = styled.span`
    margin-right: auto;
    flex-grow: 1;
`
const StyledTag = styled.span`
    text-algin: center;
    background-color: #3C58C1;
    color: white;
    border-radius: 9999px;
    padding: 0.5em 1em;
`;