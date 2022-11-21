import styled from "styled-components";
import { buttonTextColor } from "../../constants/colors";

const LogInSignUpStyle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
gap: 30px;
span {
    color: ${buttonTextColor};
    font-size: 32px;
    font-family: 'Saira Stencil One', cursive;
}
a {
  color: ${buttonTextColor};
  font-size: 14px;
  font-weight: 700;
  &:visited {
    filter: brightness(0.6);
  }
}
`;

export default LogInSignUpStyle;