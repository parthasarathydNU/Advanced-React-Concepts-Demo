import {useState} from 'react';
import styled from "styled-components";
import { useAppContext } from '../context/AppContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

function AddTransactionForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const { dispatch } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input validation
    if (!description || !amount) return;

    const transaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
    };

    // Centralizing state updates using useReducer and Context
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
    setDescription("");
    setAmount("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button type="submit">Add Transaction</Button>
    </Form>
  );
}

export default AddTransactionForm;
