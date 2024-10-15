import { Suspense, lazy } from "react";
import styled from "styled-components";
import { AppProvider } from "./context/AppContext";
import ErrorBoundary from "./components/ErrorBoundary";
import AccountSummary from "./components/AccountsSummary";

import AddTransactionForm from "./components/AddTransactionForm";

/**
 * Lazy loading the Transaction list component
 * Can add performance imporvements in case of larger applications
 * 
 */
const TransactionList = lazy(() => import('./components/TransactionList'));


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
          
          <Suspense fallback={<div>Loading transactions ...</div>}>
            <TransactionList />
          </Suspense>

        </AppContainer>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
