import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import pageUrlConfig from "../../config/pageUrlConfig";
import getSubTime from "../../api/getSubTime.api";

import PageTemplate from "../../components/PageTemplate"
import DefaultBtn, { PrimaryStyle } from "../../components/GlobalButton";

import queryAtom from "../../atoms/queryAtom";
import queryFocusAtom from "../../atoms/queryFocusAtom";

import holiday from '../../database/2023-2024-holiday.json';

// window.kakao 객체를 가져옴
const { kakao } = window;

const ResultPage = () => {
    const {id} = useParams();
    const [query, setQuery] = useRecoilState(queryAtom);
    const navigate = useNavigate();
    const title = query;
    const focus = useRecoilValue(queryFocusAtom);

    const [rowInfo, setRowInfo] = useState([]);
    const [reqCount, setReqCount] = useState(0);
    const [count, setCount] = useState(0);
    const [day, setDay] = useState(`1`);

    const [refresh, setRefresh] = useState(false);
    const [direct, setDirect] = useState('1');

    const [station, setStation] = useState({});

    const [showTime, setShowTime] = useState(false);
    
    useEffect(()=>{
        setRowInfo([]);
        setCount(0);
    },[id])
    
    //TODO: 사용자 위치, 시간에 맞게 시간표 조회하기
    useEffect(()=>{
        const userDate = new Date();
        const today = userDate.getDay();// 0: 일요일 ~ 6: 토요일
        const date = userDate.getDate();
        const month = userDate.getMonth() + 1;
        const year = userDate.getFullYear();
        
        switch(today){
            case 6:
                setDay('2');
                break;
            case 0:
                setDay('3');
                break;
            default:
                setDay('1');
                break;
        }

        if(holiday.holiday.includes(`${year}-${month}-${date}`)){
            setDay(3);
        }
        setDirect('1');
    }, [refresh])
    

    const handleClickRefresh = () => {
        setRefresh(!refresh);
    }

    const handleClickDay = (event) => {
        setDay(event.target.id);
    }

    const handleClickDirect = (event) =>{
        setDirect(event.target.id || "1");
    }

    useEffect(()=>{
        setRowInfo([]);
        setCount(0)
    }, [day, direct, refresh])
    
    //TODO(보류): 이미 검색한 기록이 있다면 리액트 쿼리를 사용하여 불러오기
    const index = 5;
    useEffect(()=>{
        rowInfo.sort();
        getSubTime(index*count, index*(count+1)-1, id, day, direct)
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
    }, [count, id, refresh])

    //TODO: title을 클릭하면 해당 지하철역을 보여주는 지도 페이지로 이동


    const handleClickStation = () => {
        navigate(`${pageUrlConfig.homePage}/${id}/${title}`);
    }

    return(
        <PageTemplate>
            <StyledLinkBtn onClick={handleClickStation}>{title}</StyledLinkBtn>
            <ButtonWrap>
                <DayButton onClick={handleClickDay}>
                    <DefaultBtn variant={day === "1" ? "primary" :"basic"} id='1'>평일</DefaultBtn>
                    <DefaultBtn variant={day === "2" ? "primary" :"basic"} id='2'>토요일</DefaultBtn>
                    <DefaultBtn variant={day === "3" ? "primary" :"basic"} id='3'>공휴일</DefaultBtn>
                </DayButton>
                <DirectButton onClick={handleClickDirect}>
                    <DefaultBtn variant={"secondary"} onClick={handleClickRefresh}>초기화</DefaultBtn>
                    <DefaultBtn variant={direct === "1" ? "primary" :"basic"} id='1'>상행</DefaultBtn>
                    <DefaultBtn variant={direct === '2' ? "primary" :"basic"} id='2'>하행</DefaultBtn>
                    <DefaultBtn variant={"basic"} onClick={()=>setShowTime(!showTime)}>급행</DefaultBtn>                
                </DirectButton>
            </ButtonWrap>
            <ul>
                {rowInfo.map((info, index)=>{
                    return (
                    <StyledList key={index}>
                        <Time>{info[0]}</Time>
                        <Station>{info[2]} ➡️ {info[3]}</Station>
                        <StyledTag aria-label="지하철 번호">{info[1]}</StyledTag>
                    </StyledList>
                    )
                })}
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

const ButtonWrap = styled.div`
    padding: 16px;

    div {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr;
        margin-bottom: 8px;
    } 
    button {
        padding: 8px 14px;
    }

    button:hover{
        ${PrimaryStyle}
    }
`
const DayButton = styled.div`

`

const DirectButton = styled.div`

`

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
    text-align: center;
    background-color: #3C58C1;
    color: white;
    border-radius: 9999px;
    padding: 0.5em 1em;
`;