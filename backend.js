const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory array to store expenses
let expenses = [];

// Add expense
app.post('/addExpense', (req, res) => {
    const { expense, amount } = req.body;
    
    if (!expense || isNaN(amount)) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    expenses.push({ expense, amount });
    res.status(201).json({ message: 'Expense added successfully' });
});

// Get all expenses
app.get('/getExpenses', (req, res) => {
    res.json(expenses);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


