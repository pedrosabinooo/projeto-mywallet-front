import styled from "styled-components";
import { inputTextColor } from "../../constants/colors";

const Input = styled.input`
    background: #FFFFFF;
    border: none;
    border-radius: 5px;
    height: 45px;
    width: 100%;
    margin-bottom: 8px;
    padding: 0 15px;
    font-size: 18px;
    display: flex;
    align-items: center;
    &::placeholder{
        color: ${inputTextColor};
    }
`;

export default Input;