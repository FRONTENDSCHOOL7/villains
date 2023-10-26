import styled from "styled-components";
import Header from "./layout/Header";

const Wrap = styled.main`
    max-width: 360px;
    height: 100vh;
    margin: 0 auto;
    background-color: #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
`;

const PageTemplate = ({children}) => {
    return (
        <Wrap>
            <Header/>
            {children}
        </Wrap>
    )
}

export default PageTemplate;