/*
 * ------------------------ index -------------------------------------
 * 
 * Package:         server
 * File:            index.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-08
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

// If the server is not in production, configures usage of
// .env file for environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Import modules
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

// Import auth middleware to configure authentication functionalities
const authentication = require('./middlewares/session');

// Import routers
const sessionRoutes = require('./routes/sessions');
const coursesRouter = require('./routes/courses');
const plansRouter = require('./routes/plans');

// Authentication functionalities initialization
authentication.useLocal();
authentication.serializeUser();
authentication.deserializeUser();

// Setting up the used port for the server
const PORT = process.env.PORT || 9000;

// init express
const app = new express();

// Setting up server modules
app.use(logger('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Setting up server routers
app.use("/api/sessions", sessionRoutes);
app.use("/api/courses", coursesRouter);
app.use("/api/study-plans", plansRouter);

// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});