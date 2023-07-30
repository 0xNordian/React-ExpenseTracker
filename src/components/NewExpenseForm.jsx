import ExpenseItem2 from "./ExpenseItem";

function NewExpenseForm(){
    const test = "This is a test";
    return <ExpenseItem2 msg={test}/>
}

export default NewExpenseForm;

// import { useState } from 'react';

// const NewExpenseForm = ({ onSaveExpenseData, expenses }) => {
//     const [formData, setFormData] = useState({
//         title: '',
//         amount: '',
//         date: '',
//     });

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         // Generate the new ID automatically
//         const lastExpense = expenses[expenses.length - 1];
//         const newId = parseInt(lastExpense.id.substr(1)) + 1;
//         const newExpense = {
//             id: `e${newId}`,
//             ...formData,
//         };

//         onSaveExpenseData(newExpense);
//         setFormData({
//             title: '',
//             amount: '',
//             date: '',
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="title">Title:</label>
//                 <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="amount">Amount:</label>
//                 <input
//                     type="number"
//                     id="amount"
//                     name="amount"
//                     min="0.01"
//                     step="0.01"
//                     value={formData.amount}
//                     onChange={handleInputChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label htmlFor="date">Date:</label>
//                 <input
//                     type="date"
//                     id="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <button type="submit">Add Expense</button>
//         </form>
//     );
// };

// export default NewExpenseForm;
