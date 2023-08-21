import React from "react";
const columns = [
    { name: "TITLE", uid: "title" },
    { name: "DATE", uid: "date" },
    { name: "CATEGORY", uid: "displayCategory" },
    { name: "AMOUNT", uid: "amount" },
    { name: "ACTIONS", uid: "actions" },
];

const expData = [];

const updateExpData = (expenses) => {
    // Clear the existing content of expData
    expData.length = 0;

    expenses.forEach((expense) => {
        // Customize this mapping according to your data structure
        expData.push({
            id: expense.id,
            title: expense.title,
            date: expense.date,
            displayCategory: expense.displayCategory,
            amount: expense.amount
        });
    });

    console.log("expData: ", expData);
};

export default { columns, expData, updateExpData };

    // {
    //     id: 1,
    //     name: "Tony Reichert",
    //     role: "CEO",
    //     team: "Management",
    //     status: "active",
    //     age: "29",
    //     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    //     email: "tony.reichert@example.com",
    // },
    // {
    //     id: 2,
    //     name: "Zoey Lang",
    //     role: "Technical Lead",
    //     team: "Development",
    //     status: "paused",
    //     age: "25",
    //     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    //     email: "zoey.lang@example.com",
    // },
    // {
    //     id: 3,
    //     name: "Jane Fisher",
    //     role: "Senior Developer",
    //     team: "Development",
    //     status: "active",
    //     age: "22",
    //     avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //     email: "jane.fisher@example.com",
    // },
    // {
    //     id: 4,
    //     name: "William Howard",
    //     role: "Community Manager",
    //     team: "Marketing",
    //     status: "vacation",
    //     age: "28",
    //     avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    //     email: "william.howard@example.com",
    // },
    // {
    //     id: 5,
    //     name: "Kristen Copper",
    //     role: "Sales Manager",
    //     team: "Sales",
    //     status: "active",
    //     age: "24",
    //     avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    //     email: "kristen.cooper@example.com",
    // },
