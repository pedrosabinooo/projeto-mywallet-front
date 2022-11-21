import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";
import TransactionTypeContext from "../contexts/TransactionTypeContext";
import { BASE_URL } from "../constants/urls";
import { backgroundColor, buttonTextColor } from "../constants/colors";
import Input from "../assets/styles/Input";
import Button from "../assets/styles/Button";

export default function TransactionPage() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useContext(UserContext);
  const { transactionType, setTransactionType } = useContext(
    TransactionTypeContext
  );
  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      value: parseFloat(value),
      description,
      type: transactionType,
    };
    const headers = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
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
    <TransactionPageStyle>
      <Header>
        <span>{`New ${
          transactionType === "deposit" ? "income" : "outcome"
        }`}</span>
      </Header>
      <form>
        <Input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </form>
      <Link to="/home">
        <Button className="cancel" onClick={setTransactionType(null)}>Cancel</Button>
      </Link>
    </TransactionPageStyle>
  );
}

const TransactionPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  gap: 13px;
  padding: 16px 0;
  form {
    width: 90%;
  }
  .cancel {
    background-color: ${backgroundColor};
    font-size: 14px;
    font-weight: 700;
    margin-top: -7px;
  }
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
`;
