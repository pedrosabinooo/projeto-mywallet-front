import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { BASE_URL } from "../constants/urls";

function MainPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {user, setUser} = useContext(UserContext);
  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { email, password };
    try {
      const response = await axios.post(`${BASE_URL}/signin`, body);
      const {token, name} = response.data;
      setUser({name, token});
      navigator("/home");
    } catch (error) {
      alert("There's been an issue. Check your login info and try again.");
      console.log(error.response);
    }
  }

  return (
    <div>
      <div>
        <h1>MyWallet</h1>
        <form>
          <input 
            type="text" 
            value={email}
            placeholder="E-mail" 
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="password" 
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={handleSubmit}>Entrar</button>
        </form>
      </div>
      <div>
        <Link to="/signup">Don't have an account? Sign up!</Link>
      </div>
    </div>
  )
}

export default MainPage;