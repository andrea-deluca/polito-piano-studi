/*
 * ------------------------ user.model --------------------------------
 * 
 * Package:         server
 * Module:          models
 * File:            user.model.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-08
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

// Import the module for cryptography
const crypto = require('crypto');

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
            else if (!row) reject(new createError.NotFound("Abbiamo controllato, ma non troviamo questa email nei nostri registri..."));
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
            else if (!row) reject(new createError.NotFound("No users with given id"));
            // A user associated with the given id is found
            else resolve(row);
        })
    })
}

// Function to create a new entry for a user within the DB
exports.createUser = (user) => {
    return new Promise((resolve, reject) => {
        // Generate a random salt for the password
        const salt = crypto.randomBytes(16);
        // Generate the hashed password to store it within the DB.
        crypto.pbkdf2(user.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
            if (err) {
                // An error occurs with pbkdf2 or crypto
                reject(new createError.InternalServerError("Internal server error with crypto"))
                return;
            }

            const query = 'INSERT INTO users (firstname, lastname, email, password, salt, verification_code, active_status) VALUES (?, ?, ?, ?, ?, ?, ?)';
            // Access to the DB
            db.run(query, [user.firstname, user.lastname, user.email, hashedPassword, salt, user.verificationCode, 0], function (err) {
                // An error occurs while accessing the DB
                if (err) reject(new createError.InternalServerError(err.message));
                // New entry for a user created within the DB, so resolve its id and its email
                else resolve({ id: this.lastID, email: user.email })
            });
        });
    })
}

// Function to update the email verification code for a user, given its registration email
exports.updateVerificationCode = (data) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET verification_code = ? WHERE email = ?';
        // Access to the DB
        db.run(query, [data.verificationCode, data.email], function (err) {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            // No changes have been made, so no user associated with the given email found
            else if (this.changes === 0) reject(new createError.NotFound('Abbiamo controllato, ma non troviamo questa email nei nostri registri...'));
            // Email verification code for the user updated
            else resolve();
        })
    })
}

// Function to verify the user registration email by its verification code and to activate its account
exports.verifyEmail = (data) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET active_status = ?, verification_code = ? WHERE email = ? and verification_code = ?';
        // Access to the DB
        db.run(query, [1, undefined, data.email, data.verificationCode], function (err) {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            // No changes have been made, so wrong verification code given
            else if (this.changes === 0) reject(new createError.NotAcceptable('Non scherziamo quando diciamo che controlliamo... Codice errato!'));
            // Registration email verified and user account activated
            else resolve();
        })
    })
}