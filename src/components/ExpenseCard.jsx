import ExpenseItem from './ExpenseItem';
import styles from './ExpenseCard.module.css'

const ExpenseCard = (props) => {
    const expensesCards = props.expensesArr.map((expense) => <ExpenseItem key={expense.id} expense={expense} />);
    return (
        <>
            <div className={styles['expenses']}>
                {expensesCards}
            </div>
        </>
    )
}

export default ExpenseCard