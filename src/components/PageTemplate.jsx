import styled from "styled-components";
import Header from "./layout/Header";

const Wrap = styled.div`
    max-width: 360px;
    height: 100vh;
    margin: 0 auto;
    background-color: #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
`;

const Main = styled.main`
    width: 100%;
    height: 100%;
`;

const PageTemplate = ({children}) => {
    return (
        <Wrap>
            <Header/>
            <Main children={children} />
        </Wrap>
    )
}

export default PageTemplate;