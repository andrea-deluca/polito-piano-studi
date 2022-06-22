/*
 * ------------------------ user.model --------------------------------
 * 
 * Package:         server
 * Module:          models
 * File:            user.model.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-20
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

// Import the module for creating HTTP errors
const createError = require('http-errors');

// Import the connection to the DB from the middleware
const db = require('../middlewares/db');

// Function to get a user by email from the DB
exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        // Access to the DB
        db.get(query, [email], (err, row) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            // No user associated with the given email found 
            else if (!row) reject(new createError.NotFound("No user with given email found"));
            // A user associated with the given email is found
            else resolve(row);
        })
    })
}

// Function to get a user by id from the DB
exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        // Access to the DB
        db.get(query, [id], (err, row) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            // No user associated with the given id found 
            else if (!row) reject(new createError.NotFound("No user with given id found"));
            // A user associated with the given id is found
            else resolve(row);
        })
    })
}