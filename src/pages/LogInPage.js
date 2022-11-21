import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { BASE_URL } from "../constants/urls";

import LogInSignUpStyle from "../assets/styles/LogInSignUpStyle";
import Button from "../assets/styles/Button";
import Input from "../assets/styles/Input";

export default function MainPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserContext);
  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { email, password };
    try {
      const response = await axios.post(`${BASE_URL}/login`, body);
      const { token, name } = response.data;
      setUser({ name, token });
      navigator("/home");
    } catch (error) {
      alert("There's been an issue. Check your login info and try again.");
      console.log(error.response);
    }
  }

  return (
    <LogInSignUpStyle>
      <span>MyWallet</span>
      <form>
        <Input
          type="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" onClick={handleSubmit}>
          Log in
        </Button>
      </form>
      <Link to="/signup">Don't have an account? Sign up!</Link>
    </LogInSignUpStyle>
  );
}
