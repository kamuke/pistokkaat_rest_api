// app
'use strict';
require('dotenv').config();
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

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, process.env.HTTP_PORT || 3000, process.env.HTTPS_PORT || 8000);
} else {
  require('./utils/localhost')(app, process.env.HTTP_PORT || 3000);
}

app.use(cors()); // Enable All CORS Requests
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(passport.initialize());

app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));
app.use('/resizes', express.static('resizes'));

app.use('/auth', authRoute);
app.use('/plant', plantRoute);
app.use('/user', userRoute);
app.use('/delivery', deliveryRoute);
app.use('/location', locationRoute);

app.use((req, res, next) => {
    const err = httpError('Sivua ei löytynyt.', 404);
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).
        json({message: err.message || 'Sisäinen palvelinvirhe.'});
});