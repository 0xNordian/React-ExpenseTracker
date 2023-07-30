import ExpenseItem from "./components/ExpenseItem"

const App = () => {
  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 9, 14),
    },
    {
      id: 'e2',
      title: 'New TV',
      amount: 799.49,
      date: new Date(2021, 2, 12)
    },
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 450,
      date: new Date(2021, 5, 12),
    },
    {
      id: 'e5',
      title: 'Samsung TV',
      amount: 980,
      date: new Date(2022, 3, 17),
    },
    {
      id: 'e6',
      title: 'iPhone 13',
      amount: 1250,
      date: new Date(2023, 6, 7),
    },
  ];

  const expensesCards = expenses.map((expense) => <ExpenseItem key={expense.id} expense={expense} />);

  return (
    <>
      <h2>Lets get started!</h2>
      <div className="expense-cards">
        {expensesCards}
      </div>
    </>
  )
}

export default App