import React from "react";
import PageTemplate from "../components/PageTemplate";
import { Link } from "react-router-dom";
import pageUrlConfig from "../config/pageUrlConfig";

const HomePage = () => {

    return(
        <PageTemplate>
            <Link to={pageUrlConfig.homePage}><button>main</button></Link>
        </PageTemplate>
    )
}

export default HomePage;