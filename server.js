const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public folder

// In-memory array to store expenses
let expenses = [];

// Basic Authentication Middleware
const auth = (req, res, next) => {
    const user = basicAuth(req);
    if (!user || user.name !== 'username' || user.pass !== 'password') {
        res.status(401).send('Authentication failed');
    } else {
        next();
    }
};

// Add expense
app.post('/addExpense', auth, (req, res) => {
    const { expense, amount } = req.body;

    if (!expense || isNaN(amount)) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    expenses.push({ expense, amount });
    res.status(201).json({ message: 'Expense added successfully' });
});

// Get all expenses
app.get('/getExpenses', auth, (req, res) => {
    res.json(expenses);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
