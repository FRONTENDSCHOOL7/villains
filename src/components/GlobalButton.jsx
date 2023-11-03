import styled, { css } from "styled-components";
import theme from "../style/theme";

/**@param variant: "primary" | "secondary" | "basic" */
const DefaultBtn = ({children, variant, disabled, id}) => {
    return <StyledButton variant={variant ?? "primary"} disabled={disabled ?? false} id={id ?? ""}>{children}</StyledButton>
}

const PrimaryStyle = css`
    background-color: ${theme.color.primary};
    color: ${theme.color.white};
    border-color: ${theme.color.primary};
`;

const SecondaryStyle = css`
    background-color: ${theme.color.secondary};
    color: ${theme.color.black};
    border-color: ${theme.color.secondary};
`;

const BasicStyle = css`
    background-color: ${theme.color.white};
    color: ${theme.color.primary};
    border-color: ${theme.color.primary};
`

const StyledButton = styled.button`
    width: 100%;
    height: 100%;
    border: 1px solid;
    border-radius: 9999px;
    cursor: pointer;
    ${(props)=>{
        switch(props.variant){
        case 'primary':
            return PrimaryStyle;
        case 'secondary':
            return SecondaryStyle;
        case 'basic':
            return BasicStyle;
        }
    }}
    &:disabled {
        border-color: ${theme.color.grey};
        background-color: ${theme.color.grey};
        color: ${theme.color.white};
        cursor: default;
    }

`;
export {PrimaryStyle, SecondaryStyle, BasicStyle};
export default DefaultBtn;