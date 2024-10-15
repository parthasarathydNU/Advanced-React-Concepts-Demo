import { useMemo } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import SummaryContainer from "../ui/SummaryContainer";

const Balance = styled.h2`
  color: #2c3e50;
  margin: 0;
`;

function AccountSummary() {
  const { state } = useAppContext();

  const totalIncome = useMemo(() => {
    console.log('Calculating total income...');
    return state.transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [state.transactions]);  

  return (
    <SummaryContainer>
      <Balance>Balance: ${state.balance.toFixed(2)}</Balance>
      <p>Total Income: ${totalIncome.toFixed(2)}</p>
    </SummaryContainer>
  );
}

// Here we can return a memoized AccountSummary component
// But there is no use for memoizing here, we return the component as is
export default AccountSummary;
