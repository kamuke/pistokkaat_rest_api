// app
'use strict';
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const plantRoute = require('./routes/plantRoute');
const userRoute = require('./routes/userRoute');
const deliveryRoute = require('./routes/deliveryRoute');
const locationRoute = require('./routes/locationRoute');
const {httpError} = require('./utils/errors');
const passport = require('./utils/pass');
const app = express();
const port = 3000;

app.use(cors()); // Enable All CORS Requests

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(passport.initialize());

app.use(express.static('uploads'));

app.use('/auth', authRoute);
app.use('/plant', plantRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/delivery', deliveryRoute);
app.use('/location', locationRoute);

app.use((req, res, next) => {
    const err = httpError('Not found2', 404);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).
        json({message: err.message || 'Internal server error'});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});