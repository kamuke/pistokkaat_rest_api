// app
'use strict';
const express = require('express');
const plantRoute = require('./routes/plantRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors()); // Enable All CORS Requests
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use('/plant', plantRoute);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});