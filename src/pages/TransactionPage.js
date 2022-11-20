import {useState, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import TransactionTypeContext from "../contexts/TransactionTypeContext"
import { BASE_URL } from "../constants/urls";

function TransactionPage() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  
  const {user} = useContext(UserContext);
  const {transactionType} = useContext(TransactionTypeContext);
  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      description, 
      type: transactionType,
      value: parseFloat(value)
    };
    const headers = {
      headers: { "Authorization": `Bearer ${user.token}`}
    }
    try {
      await axios.post(`${BASE_URL}/transactions`, body, headers);
      alert(`Successful ${transactionType}!`);
      navigator("/home");
    } catch (error) {
      console.log("An error occurred.");
      console.log(error);
    }
  }

  return (
    <div>
      <h1>{`New ${transactionType}`}</h1>
      <form>
        <input 
          type="number"
          placeholder="Value"
          value={value} 
          onChange={(e) => setValue(e.target.value)}
        />

        <input 
          type="text"
          placeholder="Description"
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>Save</button>
      </form>
    </div>
  )
}

export default TransactionPage;