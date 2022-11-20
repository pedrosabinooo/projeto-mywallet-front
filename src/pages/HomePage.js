import {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

import Transaction from "../components/Transaction";
import UserContext from "../contexts/UserContext";
import { BASE_URL } from "../constants/urls";

function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const {user} = useContext(UserContext);
  
  useEffect(() => {
    console.log("user is", user);
    async function getUserData() {
      try {
        const response = await axios.get(`${BASE_URL}/transactions`, {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        });
        console.log(response);
        setTransactions(response.data);
      } catch (error) {
        alert("Ops! Infelizmente aconteceu um erro! Tente novamente!");
        console.log(error.response);
      }
    }

    getUserData();
    
  }, []);

  function buildTransactions() {
    if(transactions.length > 0) {
      return transactions.map((transaction, index) => {
        const {type, date, description, value} = transaction;
        return (
          <Transaction 
            key={index}
            type={type}
            date={date}
            description={description}
            value={value}
          />
        )
      })
    } else {
      return <p>Não há registros de entrada ou saída</p>
    }
  }

  function buildBalance() {
    if(transactions.length > 0) {
      return transactions.reduce((previous, current) => {
        if(current.type === "deposit") {
          return previous + current.value;
        }

        return previous - current.value;
      }, 0)
    } else {
      return 0;
    }
  }
  
  const transacationsSection = buildTransactions();
  const balanceSection = buildBalance();
  return (
    <div>
      <div>
        <h1>Olá, {user.name}</h1>
        (logout)
      </div>
      <div>
        <div>{transacationsSection}</div>
        <div>Saldo: {balanceSection}</div>
      </div>
      <div>
        <Link to="/deposit"><button>Nova Entrada</button></Link>
        <Link to="/withdraw"><button>Nova Saída</button></Link>
      </div>
    </div>
  )

}

export default HomePage;