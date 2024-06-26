/**
 * 
 * @param direct "left" || "right" ...
 * @returns 현재 "left"만 있음
 */
const ArrowIcon = ({direct}) => {
    return (

        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            {
            direct === "left" ? 
                <g id="icon-arrow-left">
                    <path id="Vector" d="M17.4166 11H4.58325" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_2" d="M10.9999 17.4167L4.58325 11L10.9999 4.58334" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                :
                <g id="icon-arrow-left">
                    <path id="Vector" d="M17.4166 11H4.58325" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Vector_2" d="M10.9999 17.4167L4.58325 11L10.9999 4.58334" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            }

        </svg>

    )
}

export default ArrowIcon;