import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

const SummaryContainer = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Balance = styled.h2`
  color: #2c3e50;
  margin: 0;
`;

function AccountSummary() {
  const { state } = useAppContext();

  return (
    <SummaryContainer>
      <Balance>Balance: ${state.balance.toFixed(2)}</Balance>
    </SummaryContainer>
  );
}

// Here we can return a memoized AccountSummary component
// But there is no use for memoizing here, we return the component as is
export default AccountSummary;
