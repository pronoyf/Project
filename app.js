const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');

const app = express();
const port = 3000;

app.use(bodyParser.json());

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

app.post('/addExpense', auth, (req, res) => {
    // ... same code as before
});

app.get('/getExpenses', auth, (req, res) => {
    // ... same code as before
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});