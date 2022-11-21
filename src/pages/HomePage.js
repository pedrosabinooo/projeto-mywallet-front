import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Transaction from "../components/Transaction";
import UserContext from "../contexts/UserContext";
import TransactionTypeContext from "../contexts/TransactionTypeContext";

import { BASE_URL } from "../constants/urls";
import Button from "../assets/styles/Button";
import {
  transactionsBackgroundColor,
  noRecordsTextColor,
} from "../constants/colors";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(UserContext);

  const { setTransactionType } = useContext(TransactionTypeContext);

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(`${BASE_URL}/transactions`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(response);
        setTransactions(response.data);
      } catch (error) {
        // alert("Oops! There's something wrong! Please try again!");
        console.log(error.response);
      }
    }

    getUserData();
  }, []);

  function signOut() {
    try {
      const response = axios.get(`${BASE_URL}/signout`);
      console.log("Log in again to check your balance.")
    } catch (error) {
      // alert("Oops! There's something wrong! Please try again!");
      console.log(error.response);
    }
  }

  function buildTransactions() {
    if (transactions.length > 0) {
      return transactions.map((transaction, index) => {
        const { type, date, description, value } = transaction;
        return (
          <Transaction
            key={index}
            type={type}
            date={date}
            description={description}
            value={value}
          />
        );
      });
    } else {
      return (
        <span color={noRecordsTextColor}>
          There is no records of transactions just yet.
        </span>
      );
    }
  }

  function buildBalance() {
    if (transactions.length > 0) {
      return transactions.reduce((previous, current) => {
        if (current.type === "deposit") {
          return previous + current.value;
        }
        return previous - current.value;
      }, 0);
    } else {
      return 0;
    }
  }

  const transacationsSection = buildTransactions();
  const balanceSection = buildBalance();
  return (
    <HomePageStyle>
      <Header>
        <span>Hello, {user.name}</span>
        <ion-icon name="exit-outline" onClick={() => signOut()}></ion-icon>
      </Header>
      <TransactionsContainer>
        <div>{transacationsSection}</div>
        <div>
          <span>
            <b>BALANCE</b>
          </span>
          <span>{balanceSection}</span>
        </div>
      </TransactionsContainer>
      <ButtonContainer>
        <Link to="/transaction">
          <Button
            className="transaction-button"
            onClick={() => setTransactionType("deposit")}
          >
            <ion-icon name="add-circle-outline"></ion-icon>
            New income
          </Button>
        </Link>
        <Link to="/transaction">
          <Button
            className="transaction-button"
            onClick={() => setTransactionType("withdraw")}
          >
            <ion-icon name="remove-circle-outline"></ion-icon>
            New outcome
          </Button>
        </Link>
      </ButtonContainer>
    </HomePageStyle>
  );
}

const HomePageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  gap: 13px;
  padding: 16px 0;
`;
const Header = styled.header`
  color: #ffffff;
  font-weight: 700;
  font-size: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  height: 10%;
  width: 90%;
  ion-icon {
    cursor: pointer;
  }
`;
const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${transactionsBackgroundColor};
  height: 75%;
  width: 90%;
  border-radius: 5px;
  padding: 15px 20px;
  * {
    display: flex;
    justify-content: space-between;
    background-color: transparent;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  min-height: 115px;
  height: 15%;
  gap: 15px;
  a {
    width: 100%;
  }
  .transaction-button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    height: 100%;
    padding: 10px;
    font-weight: 700;
    font-size: 17px;
    ion-icon {
      font-size: 25px;
      background-color: transparent;
    }
  }
`;
