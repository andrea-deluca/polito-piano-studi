/*
 * ------------------------ study-plan.model --------------------------
 * 
 * Package:         server
 * Module:          models
 * File:            study-plan.model.js
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

// Function to get all info about the study plan associated
// with the logged in user
exports.getStudyPlanByUser = (user) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT P.id, P.tot_credits as totCredits, 
                P.create_timestamp as createDate, P.last_update_timestamp as updateDate, T.id as typeId, T.name as typeName,
                T.min_credits as minCredits, T.max_credits as maxCredits, C.course_code as course
            FROM study_plans as P, study_plan_types as T, courses_lists as C 
            WHERE P.type_id = T.id and P.list_id = C.id and P.user_id = ?`;

        // Access to the DB
        db.all(query, [user], (err, rows) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            // No study plan associated with the logged in user found
            else if (rows.length === 0) reject(new createError.NotFound("No study plan found"));
            // Build and send an object with study plan info
            else resolve({
                id: rows[0].id,
                totCredits: rows[0].totCredits,
                type: { id: rows[0].typeId, name: rows[0].typeName, min: rows[0].minCredits, max: rows[0].maxCredits },
                createDate: rows[0].createDate,
                updateDate: rows[0].updateDate,
                courses: rows.map(row => row.course)
            });
        })
    })
}

// Function to get courses list associated with a study plan by user
exports.getListIdByUser = (user) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT list_id FROM study_plans WHERE user_id = ?';
        // Access to the DB
        db.get(query, [user], (err, row) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            // No study plan found
            else if (!row) reject(new createError.NotFound('No study plans asoociated with the user'));
            else resolve(row.list_id);
        })
    })
}

// Function to create a study plan associated with the logged in user
exports.createStudyPlan = (user, plan) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO study_plans (user_id, list_id, type_id, tot_credits, create_timestamp, last_update_timestamp) VALUES (?, ?, ?, ?, ?, ?)';
        // Access to the DB
        db.run(query, [user, plan.list, plan.type, plan.credits, plan.createDate, plan.updateDate], function (err) {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            else resolve();
        })

    })
}

// Function to update info about the study plan associated with the logged in user
exports.updateStudyPlan = (id, user, plan) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE study_plans SET tot_credits = ?, last_update_timestamp = ? WHERE id = ? and user_id = ?';
        // Access to the DB
        db.run(query, [plan.credits, plan.updateDate, id, user], (err) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            else resolve();
        })
    })
}

// Function to delete the study plan associated with the logged in user
exports.deleteStudyPlan = (id, user) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM study_plans WHERE id = ? and user_id = ?';
        // Access to the Db
        db.run(query, [id, user], function (err) {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            else resolve();
        })
    })
}