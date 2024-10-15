import React, { useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

/**
 * Using styled components
 */
const ListContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const ListItem = styled.div`
  padding: 0 10px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function TransactionList() {
  const { state } = useAppContext();

  /**
   * useCallback hook to memoize function calls unless parameters change
   * while useMemo is used to memoize values from a function call
   * 
   * useCallback is used when you want to prevent a function from being 
   * recreated on every render, especially if that function is being passed 
   * as a prop to a child component wrapped in React.memo.
   */
  const Row = useCallback(({ index, style }) => {
    const transaction = state.transactions[index];
    return (
      <ListItem style={style}>
        <span>{transaction.description}</span>
        <span>${transaction.amount.toFixed(2)}</span>
      </ListItem>
    );
  }, [state.transactions]);

  return (
    <ListContainer>
      <List
        height={400}
        itemCount={state.transactions.length}
        itemSize={50}
        width="100%"
      >
        {Row}
      </List>
    </ListContainer>
  );
}

export default TransactionList;
