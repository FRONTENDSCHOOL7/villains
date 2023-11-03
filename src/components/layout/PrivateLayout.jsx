import { Outlet, useLocation, useNavigate } from "react-router"
import { Wrap } from "../PageTemplate.style";
import NavMenu from "./NavMenu";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
import pageUrlConfig from "../../config/pageUrlConfig";
import BackHeader from "./BackHeader";
import styled from "styled-components";

const PrivateLayout = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userAtom);
    const { pathname } = useLocation();
    const key = localStorage.getItem('user');

    useEffect(()=>{
        if(!key){
            navigate(pageUrlConfig.signInPage, {state:pathname});
        } else{
            setUser(JSON.parse(key));
        }
    }, [])

    const handleClickBack = () => {
        const mainPath = pathname.split('/')[1];
        navigate(`/${mainPath}`);
    }
    return (
    <Wrap>
        <BackHeader onClick={handleClickBack}/>
        <BackGround />
        <Outlet/>
        <NavMenu/>
    </Wrap>
    )
}


export default PrivateLayout;

const BackGround = styled.div`
  height: 48px;
`;