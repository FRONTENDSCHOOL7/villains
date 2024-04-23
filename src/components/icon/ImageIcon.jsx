import styled from 'styled-components';

const StyledSvg = styled.svg`
    width: ${props => props.width || "60"}px;
    height: ${props => props.width || "60"}px;
`;

const ImageIcon = ({ color = '#C4C4C4', width = "60" }) => (
    <StyledSvg width={width} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="image">
        <path id="Vector" d="M47.5 7.5H12.5C9.73858 7.5 7.5 9.73858 7.5 12.5V47.5C7.5 50.2614 9.73858 52.5 12.5 52.5H47.5C50.2614 52.5 52.5 50.2614 52.5 47.5V12.5C52.5 9.73858 50.2614 7.5 47.5 7.5Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path id="Vector_2" d="M21.25 25C23.3211 25 25 23.3211 25 21.25C25 19.1789 23.3211 17.5 21.25 17.5C19.1789 17.5 17.5 19.1789 17.5 21.25C17.5 23.3211 19.1789 25 21.25 25Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path id="Vector_3" d="M52.5 37.5L40 25L12.5 52.5" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </StyledSvg>
)

export default ImageIcon ;