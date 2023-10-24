import React from "react";
import PageTemplate from "../components/PageTemplate";
import { Link } from "react-router-dom";
import pageUrlConfig from "../config/pageUrlConfig";
import client from "../config/api.config";

const HomePage = () => {

    return(
        <PageTemplate>
            <Link to={pageUrlConfig.homePage}><button>main</button></Link>
        </PageTemplate>
    )
}

export default HomePage;