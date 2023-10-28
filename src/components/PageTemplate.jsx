import styled from "styled-components";
import Header from "./layout/Header";

const Wrap = styled.div`
    max-width: 412px;
    min-height: 100vh;
    margin: 0 auto;
    background-color: #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
`;

const Main = styled.main`
    width: 100%;
    min-height: 100vh;
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