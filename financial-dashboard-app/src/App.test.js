import React, { act, useContext } from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import { AppProvider, AppContext, ACTION_TYPES } from '../src/context/AppContext';
import AccountSummary from '../src/components/AccountsSummary';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';


const renderWithProvider = (componentToTest) => {
    return render(
        <AppProvider>{componentToTest}</AppProvider>
    );
};

describe('AccountSummary', () => {
    it('renders the account balance', () => {
        renderWithProvider(<AccountSummary />);

        /**
         * Since we can't control the initial state, 
         * since transactions are randomly generated in the AppProvider
         * we'll check for the presence of the balance
         */
        expect(screen.getByText(/Balance: \$/)).toBeInTheDocument();  
    })

    it('renders the total income', () => {
      renderWithProvider(<AccountSummary />);
  
      // Check for the presence of total income
      expect(screen.getByText(/Total Income: \$/)).toBeInTheDocument();
    });    
})

describe('AddTransactionForm', () => {

  it('adds a new transaction when form is submitted', () => {

    const mockDispatch = jest.fn();

    /**
     * Render the component with a mockedDispatch
     */
    render(
      <AppContext.Provider value={{dispatch: mockDispatch }} >
        <AddTransactionForm />
      </AppContext.Provider>
    );

    /**
     * Trigger a dom event
     */
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Test Transaction' }
    });

    fireEvent.change(screen.getByPlaceholderText('Amount'), {
      target: { value: '100' }
    });

    fireEvent.click(screen.getByText('Add Transaction'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ACTION_TYPES.ADD_TRANSACTION,
      payload: expect.objectContaining({
        description: 'Test Transaction',
        amount: 100
      })
    })
  })
});

/**
 * Testing Transaction List Component
 */

jest.mock('react-window', () => ({
  FixedSizeList: ({children, itemCount}) => {
    const items = [];
    for (let i = 0; i < Math.min(itemCount, 10); i++) {
      items.push(children({ index: i, style: {} }));
    }
    return <div data-testid="virtual-list">{items}</div>;
  }
}));

describe('TransactionList', () => {
  it('renders transactions', () => {
    renderWithProvider(<TransactionList />);

    const listItems = screen.getByTestId('virtual-list').children;
    expect(listItems.length).toBeGreaterThan(1);
    expect(screen.getAllByText(/Transaction \d+/).length).toBeGreaterThan(1);
    expect(screen.getAllByText(/\$\d+\.\d{2}/).length).toBeGreaterThan(1);   
  })
})


/**
 * Testing App Context
 */

describe('AppContext', () => {
  it('provides the correct initial state', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useContext(AppContext);
      return null;
    }

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )

    expect(contextValue.state).toEqual(expect.objectContaining({
      "balance": expect.any(Number),
      "transactions": expect.any(Array)
    }))

    /**
     * Since we are initializing the random list of 50000 transactions
     */
    expect(contextValue.state.transactions.length).toEqual(50000)
  });

  it('updates state correctly when adding a transaction', () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = useContext(AppContext);
      return null;
    };


    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const initialBalance = contextValue.state.balance;

    act(() => {
      contextValue.dispatch({
        type: ACTION_TYPES.ADD_TRANSACTION,
        payload: {
          description: "Test",
          amount: 100
        }
      });
    });

    expect(contextValue.state.balance).toBe(initialBalance + 100);
    expect(contextValue.state.transactions[0]).toEqual(expect.objectContaining({
      "description": "Test",
      "amount" : 100
    }))
  })
})
