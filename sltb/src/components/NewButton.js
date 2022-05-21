import React from "react";
import '../style/NewButton.css';
import { Link } from 'react-router-dom';


const STYLES = ['btnn--primary','btnn--outline'];
const SIZES = ['btnn--medium','btnn--large'];
export const NewButton = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    :STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <Link to='/userlogin' className="btnn-mobile">
            <button className={`btnn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}>
                    {children}
            </button>
        </Link>
    );
}