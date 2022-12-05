// app
'use strict';
const express = require('express');
const cors = require('cors');
const plantRoute = require('./routes/plantRoute');
const userRoute = require('./routes/userRoute');
const {httpError} = require('./utils/errors');
const app = express();
const port = 3000;

app.use(cors()); // Enable All CORS Requests
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static('uploads'));

app.use('/plant', plantRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {
    const err = httpError('Not found', 404);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).
        json({message: err.message || 'Internal server error'});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});