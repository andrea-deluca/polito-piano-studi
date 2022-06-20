/*
 * ------------------------ session.validations -----------------------
 * 
 * Package:         server
 * Module:          validations
 * File:            session.validations.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-20
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

// Import the module for validation checks
const { body } = require('express-validator');

// Validation checks for the request body of the route that
// perform the login of a user
exports.login = [
    body('username').isEmail().exists({ checkFalsy: true }),
    body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    }).exists({ checkFalsy: true }),
];