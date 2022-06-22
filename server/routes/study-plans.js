/*
 * ------------------------ study-plans --------------------------------
 * 
 * Package:         server
 * Module:          routes
 * File:            study-plans.js
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

// Import the module for creating HTTP errors
const createError = require('http-errors');

// Import the module for validations
const { validationResult } = require('express-validator');
// Import checks for validations
const check = require('../validations/study-plan.validations');

// Import session middleware to check if the user is authenticated
const { withAuth } = require('../middlewares/session');
// Import constraints middleware to check for study plan constraints errors
const { withConstraints } = require('../middlewares/constraints');

// Import models/DAOs (Data Access Objects)
const courseModel = require('../models/course.model');
const planModel = require('../models/study-plan.model');
const listModel = require('../models/courses-list.model');

// GET /api/study-plans
// Route to get info about study plan associated with the logged in user
router.get('/', withAuth, (req, res) => {
    // Get study plan info by logged in user id
    planModel.getStudyPlanByUser(req.user.id)
        .then(plan => res.status(200).json(plan))
        .catch(err => res.status(err.statusCode).json({ message: err.message }))
})

// POST /api/study-plans
// Route to create a new study plan
router.post('/', withAuth, check.createStudyPlan, withConstraints, (req, res) => {
    // Check for validation errors associated with request content
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        // If a validation error occurs, generate an HTTP error
        const error = new createError.UnprocessableEntity('Validation error');
        return res.status(error.statusCode).json({ errors: validationErrors.array(), message: error.message });
    }

    // Updates enrolled students into courses
    courseModel.updateEnrolledStudents(req.body.updates)
        .then(() => {
            // Create a new courses list associated with the new study plan
            listModel.createCoursesList(req.body.updates.inserts)
                .then((list) => {
                    // Create a new study plan
                    planModel.createStudyPlan(req.user.id, { ...req.body.plan, list: list })
                        .then(() => res.status(200).end())
                        .catch(err => res.status(err.statusCode).json({ message: err.message }));
                })
                .catch(err => res.status(err.statusCode).json({ message: err.message }));
        })
        .catch(err => res.status(err.statusCode).json({ message: err.message }));
})

// PUT /api/study-plans/:id
// Route to update the study plan associated with the logged in user, given the study plan id
router.put('/:id', withAuth, check.updateStudyPlan, withConstraints, (req, res) => {
    // Check for validation errors associated with request content
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        // If a validation error occurs, generate an HTTP error
        const error = new createError.UnprocessableEntity('Validation error');
        return res.status(error.statusCode).json({ errors: validationErrors.array(), message: error.message });
    }

    // Update study plan info
    planModel.updateStudyPlan(req.params.id, req.user.id, req.body.plan)
        .then(() => {
            // Get the courses list associated with the study plan
            planModel.getListIdByUser(req.user.id)
                .then(listId => {
                    // Update courses into the list
                    listModel.updateCoursesList(listId, req.body.updates)
                        .then(() => {
                            // Update enrolled students into courses
                            courseModel.updateEnrolledStudents(req.body.updates)
                                .then(() => res.status(200).end())
                                .catch((err) => res.status(err.statusCode).json({ message: err.message }))
                        })
                        .catch((err) => res.status(err.statusCode).json({ message: err.message }))
                })
                .catch((err) => res.status(err.statusCode).json({ message: err.message }))
        })
        .catch((err) => res.status(err.statusCode).json({ message: err.message }))
})

// DELETE /api/study-plans/:id
// Route to delete a study plan and its associated courses list, given the study plan id
router.delete('/:id', withAuth, check.deleteStudyPlan, (req, res) => {
    // Check for validation errors associated with request content
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        // If a validation error occurs, generate an HTTP error
        const error = new createError.UnprocessableEntity('Validation error');
        return res.status(error.statusCode).json({ errors: validationErrors.array(), message: error.message });
    }

    // Get courses list associated with the study plan by user id
    planModel.getListIdByUser(req.user.id)
        .then(listId => {
            // Get all courses into the list
            listModel.getCourses(listId)
                .then(courses => {
                    // Delete the list and all the courses inside it
                    listModel.deleteCoursesList(listId)
                        .then(() => {
                            // Update enrolled students into courses
                            courseModel.updateEnrolledStudents({ inserts: [], deletes: courses })
                                .then(() => {
                                    // Delete the study plan
                                    planModel.deleteStudyPlan(req.params.id, req.user.id)
                                        .then(() => res.status(200).end())
                                        .catch(err => res.status(err.statusCode).json({ message: err.message }));
                                })
                                .catch((err) => res.status(err.statusCode).json({ message: err.message }))
                        })
                        .catch((err) => res.status(err.statusCode).json({ message: err.message }))
                })
                .catch((err) => res.status(err.statusCode).json({ message: err.message }))
        })
        .catch((err) => res.status(err.statusCode).json({ message: err.message }))
})

module.exports = router;