/*
 * ------------------------ sessions -----------------------------------
 * 
 * Package:         server
 * Module:          routes
 * File:            sessions.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

const express = require('express');
const router = express.Router();

// Import the module for authentication
const passport = require('passport');

// Import the module for creating HTTP errors
const createError = require('http-errors');

// Import the module for validations
const { validationResult } = require('express-validator');
// Import checks for validations
const check = require('../validations/session.validations');

// POST /api/sessions/password
// Route to perform user login with passport local strategy
router.post('/password', check.login, (req, res, next) => {
    // Check for validation errors associated with request object
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        // If a validation error occurs, generate an HTTP error
        const error = new createError.Unauthorized('Username e/o password errati');
        return res.status(error.statusCode).json({ message: error.message });
    }

    // Perform the authentication check
    passport.authenticate('local', (err, user) => {
        // An error occurs while performing authentication
        if (err) return res.status(err.statusCode).json({message: err.message});
        // Perform login
        req.login(user, (err) => {
            // An error occurs while performing login
            if (err) return next(err);
            // User is logged in and the server sends back the user object as response
            return res.json(req.user);
        });
    })(req, res, next);
});

// DELETE /api/sessions/current
// Route to perform the logout of the user
router.delete('/current', (req, res, next) => {
    // Perform logout
    req.logout((err) => {
        // An error occurs while performing logout
        if (err) return next(err);
    })
    // Logout successfully performed
    res.end();
})

// GET /api/sessions/current
// Route to get the current session of a user, if he is logged in
router.get('/current', (req, res) => {
    // If the user is authenticated and logged in, the server sends back user data as response
    if (req.isAuthenticated()) return res.status(200).json(req.user);

    // User is not authenticated and logged in
    const error = new createError.Unauthorized("Unauthenticated user");
    res.status(error.statusCode).json({ message: error.message })
})

module.exports = router;