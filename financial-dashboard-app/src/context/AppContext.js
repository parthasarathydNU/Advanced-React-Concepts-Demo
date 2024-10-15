import React, { createContext, useContext, useReducer } from "react";

// Reducer
// Function to generate a random transaction
const generateRandomTransaction = (id) => ({
  id,
  description: `Transaction ${id}`,
  amount: Math.round((Math.random() * 1000 - 500) * 100) / 100, // Random amount between -500 and 500
  date: new Date(Date.now() - Math.random() * 31536000000).toISOString() // Random date within the last year
});

// Initializer function for useReducer
const initializeState = () => {
  const transactions = Array.from({ length: 50000 }, (_, i) => generateRandomTransaction(i + 1));
  const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 1000);
  return { balance, transactions };
};


export const ACTION_TYPES = {
  ADD_TRANSACTION: "ADD_TRANSACTION",
};

function transactionsReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_TRANSACTION:
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
}

// Context

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(transactionsReducer, null, initializeState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Here we define the custom hook as well so that there is no issues regarding typing errors while 
// trying to access the AppContext within any component
export function useAppContext() {
  return useContext(AppContext);
}
