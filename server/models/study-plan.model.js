/*
 * ------------------------ study-plan.model --------------------------
 * 
 * Package:         server
 * Module:          models
 * File:            study-plan.model.js
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

const createError = require('http-errors');

const db = require('../middlewares/db');

exports.getStudyPlan = (user) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT P.id, P.tot_credits as totCredits, P.list_id as listId, 
            P.create_timestamp as createDate, P.last_update_timestamp as updateDate, T.name as typeName,
            T.min_credits as minCredits, T.max_credits as maxCredits, C.course_code as course
            FROM study_plans as P, study_plan_types as T, courses_lists as C 
            WHERE P.type_id = T.id and P.list_id = C.id and P.user_id = ?`;

        db.all(query, [user], (err, rows) => {
            if (err) reject(new createError.InternalServerError(err.message));
            else if (rows.length === 0) reject(new createError.NotFound("No study plan found"));
            else resolve({
                id: rows[0].id,
                list: rows[0].listId,
                totCredits: rows[0].totCredits,
                type: { name: rows[0].typeName, min: rows[0].minCredits, max: rows[0].maxCredits },
                createDate: rows[0].createDate,
                updateDate: rows[0].updateDate,
                courses: rows.map(row => row.course)
            });
        })
    })
}

exports.createStudyPlan = (user, plan) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO study_plans (user_id, list_id, type_id, tot_credits, create_timestamp, last_update_timestamp) VALUES (?, ?, ?, ?, ?, ?)';
        db.run(query, [user, plan.list, plan.type, plan.credits, plan.createDate, plan.updateDate], function (err) {
            if (err) reject(new createError.InternalServerError(err.message));
            else resolve();
        })

    })
}

exports.updateStudyPlan = (user, credits, updateDate) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE study_plans SET tot_credits = ?, last_update_timestamp = ? WHERE user_id = ?';
        db.run(query, [credits, updateDate, user], (err) => {
            if (err) reject(new createError.InternalServerError(err.message));
            else resolve();
        })
    })
}

exports.deleteStudyPlan = (user) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM study_plans WHERE user_id = ?';
        db.run(query, [user], function (err) {
            if (err) reject(new createError.InternalServerError('Error while deleting study plan'));
            else resolve();
        })
    })
}