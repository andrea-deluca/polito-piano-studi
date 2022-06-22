/*
 * ------------------------ index -------------------------------------
 * 
 * Package:         server
 * File:            index.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-20
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

// Import modules
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');

// Import auth middleware to configure authentication functionalities
const authentication = require('./middlewares/session');

// Import routers
const sessionsRouter = require('./routes/sessions');
const coursesRouter = require('./routes/courses');
const studyPlansRouter = require('./routes/study-plans');
const studyPlanTypesRouter = require('./routes/study-plan-types');

// Authentication functionalities initialization
authentication.useLocal();
authentication.serializeUser();
authentication.deserializeUser();

// Setting up the used port for the server
const PORT = 3001;

// init express
const app = new express();

// Setting up server modules
app.use(logger('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  secret: "2ayh4mTQvRs4@NAu",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Setting up server routers
app.use("/api/sessions", sessionsRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/study-plans", studyPlansRouter);
app.use("/api/study-plans/types", studyPlanTypesRouter);

// activate the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});