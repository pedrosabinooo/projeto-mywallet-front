import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/urls";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const navigator = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
        passwordConfirmation
      });
      
      navigator("/");
    } catch (error) {
      alert("Oops! There's something wrong! Please try again!");
      console.log(error);
    }
  }
  
  return (
    <div>
      <div>
        <h1>MyWallet</h1>
        <form>
          <input 
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            type="text" 
            value={email}
            placeholder="E-mail" 
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="text" 
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input 
            type="text" 
            value={passwordConfirmation}
            placeholder="Password confirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <button type="submit" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
      <div>
        <Link to="/">Already have an account? Log in!</Link>
      </div>
    </div>
  )
}

export default SignUpPage;