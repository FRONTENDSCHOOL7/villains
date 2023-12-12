import styled from "styled-components";

const IconLabel = ({children, onClick}) => {
    return(
        <Label onClick={onClick}>
            {children}
        </Label>
    )
}

export default IconLabel;

const Label = styled.label`
    display: flex;
    gap: 2px;
    justify-content: center;
    align-items: center;
`