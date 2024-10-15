import styled from "styled-components";
import { ACTION_TYPES, useAppContext } from "../context/AppContext";
import { useForm } from "../hooks/useForm";

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
  const { dispatch } = useAppContext();

  /**
   * Here we extract the custom form submission logic in this component,
   * but we abstract other form updates and values resetting logic into the useFrom Hook
   * and call it through methods exposed
   * 
   * This component only worries about how to handle values on submit
   * Then what are the initial values to be passed to create the form
   */
  const formOnSubmit = (formValues) => {
    dispatch({
      type: ACTION_TYPES.ADD_TRANSACTION,
      payload: {
        id: Date.now(),
        description: formValues.description,
        amount: parseFloat(formValues.amount),
      },
    });
  };

  const { values, handleChange, handleSubmit } = useForm(
    { description: "", amount: "" },
    formOnSubmit
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="description"
        type="text"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
      />
      <Input
        name="amount"
        type="number"
        placeholder="Amount"
        value={values.amount}
        onChange={handleChange}
      />
      <Button type="submit">Add Transaction</Button>
    </Form>
  );
}

export default AddTransactionForm;
