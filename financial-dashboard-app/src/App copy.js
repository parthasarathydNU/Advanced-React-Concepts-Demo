import logo from "./logo.svg";
import styled from "styled-components";
import { AppProvider } from "./context/AppContext";
import ErrorBoundary from "./components/ErrorBoundary";
import AccountSummary from "./components/AccountsSummary";
import TransactionList from "./components/TransactionList";
import AddTransactionForm from "./components/AddTransactionForm";

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContainer>
          <h1>Financial Dashboard</h1>
          <AccountSummary />
          <AddTransactionForm />
          <TransactionList />
        </AppContainer>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
