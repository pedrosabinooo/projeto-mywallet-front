import styled from "styled-components";
import { buttonColor, buttonTextColor } from "../../constants/colors";

const Button = styled.button`
    width: 100%;
    height: 46px;
    margin-top: 10px;
    background: ${buttonColor};
    border-radius: 5px;
    border: none;
    color: ${buttonTextColor};
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
`;

export default Button;