/*
 * ------------------------ study-plan-type.model ----------------------
 * 
 * Package:         server
 * Module:          models
 * File:            study-plan-type.model.js
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

// Function to get study plan types info
exports.getStudyPlanOptions = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM study_plan_types';
        // Access to the DB
        db.all(query, [], (err, rows) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            // No options found
            if (rows.length === 0) reject(new createError.NotFound('Options not found'));
            else resolve(rows);
        })
    })
}