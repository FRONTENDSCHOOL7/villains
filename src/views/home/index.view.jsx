import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import SearchHeader from "../../components/layout/SearchHeader";
import pageUrlConfig from "../../config/pageUrlConfig";

const IndexPage = ( ) => {
    const { pathname } = useLocation();
    const [showListBox, setShowListBox] = useState(false);
    const [isClickInfo, setIsClickInfo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      if (isClickInfo) {
        navigate(`${pageUrlConfig.homePage}/${params}`);
        setShowListBox(false);
        setIsClickInfo(false);
      }
    }, [isClickInfo]);

    useEffect(() => {
        if (focus) setShowListBox(true);
      }, [focus]);


    const handleClickBack = () => {
        const mainPath = pathname.split('/')[1];
        setShowListBox(false);
        navigate(`/${mainPath}`);
    }

    return <>
    <SearchHeader onClick={handleClickBack}/>
    <Outlet />
    </>
}

export default IndexPage;