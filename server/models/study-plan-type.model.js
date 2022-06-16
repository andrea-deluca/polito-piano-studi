/*
 * ------------------------ study-plan-type.model ----------------------
 * 
 * Package:         server
 * Module:          models
 * File:            study-plan-type.model.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-16
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

const createError = require('http-errors');

const db = require('../middlewares/db');

exports.getStudyPlanOptions = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM study_plan_types';
        db.all(query, [], (err, rows) => {
            if (err) reject(new createError.InternalServerError('Error while getting plan options'));
            if (rows.length === 0) reject(new createError.NotFound('Options not found'));
            else resolve(rows);
        })
    })
}