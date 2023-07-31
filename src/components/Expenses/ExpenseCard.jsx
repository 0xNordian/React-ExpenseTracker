import ExpenseItem from './ExpenseItem';
import styles from './ExpenseCard.module.css'
import Card from '../UI/Card'

const ExpenseCard = (props) => {
    const expensesCards = props.expensesArr.map((expense) => <ExpenseItem key={expense.id} expense={expense} />);
    if (expensesCards.length === 0) {
        return (
            <>
                <Card className={styles['expenses']}>
                    <h2 className={styles['expenses__title']}>No expenses found.</h2>
                </Card>
            </>
        )
    }
    return (
        <>
            <Card className={styles['expenses']}>
                {expensesCards}
            </Card>
        </>
    )
}

export default ExpenseCard