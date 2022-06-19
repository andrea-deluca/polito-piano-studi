/*
 * ------------------------ study-plans --------------------------------
 * 
 * Package:         server
 * Module:          routes
 * File:            study-plans.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-20
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

const express = require('express');
const router = express.Router();

const createError = require('http-errors');

const { validationResult } = require('express-validator');
const check = require('../validations/study-plan.validations');

const courseModel = require('../models/course.model');
const planModel = require('../models/study-plan.model');
const listModel = require('../models/courses-list.model');

const { withAuth } = require('../middlewares/session');
const { withConstraints } = require('../middlewares/constraints');

router.get('/', withAuth, (req, res) => {
    planModel.getStudyPlan(req.user.id)
        .then(plan => {
            res.status(200).json(plan);
        })
        .catch(err => {
            res.status(err.statusCode).json({ message: err.message });
        })
})

router.post('/', withAuth, check.createStudyPlan, (req, res) => {
    // Check for validation errors associated with request content
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        // If a validation error occurs, generate an HTTP error
        const error = new createError.UnprocessableEntity('Validation error');
        return res.status(error.statusCode).json({ errors: validationErrors.array(), message: error.message });
    }

    courseModel.updateEnrolledStudents({ inserts: req.body.courses, deletes: [] })
        .then(() => {
            listModel.createCoursesList(req.body.courses)
                .then((list) => {
                    planModel.createStudyPlan(req.user.id, { ...req.body.plan, list: list })
                        .then(() => res.status(200).end())
                        .catch(err => res.status(err.statusCode).json({ message: err.message }));
                })
                .catch(err => res.status(err.statusCode).json({ message: err.message }));
        })
        .catch(err => res.status(err.statusCode).json({ message: err.message }));
})

router.put('/:id', withAuth, check.updateStudyPlan, withConstraints, (req, res) => {
    // Check for validation errors associated with request content
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        // If a validation error occurs, generate an HTTP error
        const error = new createError.UnprocessableEntity('Validation error');
        return res.status(error.statusCode).json({ errors: validationErrors.array(), message: error.message });
    }

    planModel.updateStudyPlan(req.params.id, req.user.id, req.body.plan)
        .then(() => {
            planModel.getListIdByUser(req.user.id)
                .then(listId => {
                    listModel.updateCoursesList(listId, req.body.updates)
                        .then(() => {
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

router.delete('/:id', withAuth, check.deleteStudyPlan, (req, res) => {
    // Check for validation errors associated with request content
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        // If a validation error occurs, generate an HTTP error
        const error = new createError.UnprocessableEntity('Validation error');
        return res.status(error.statusCode).json({ errors: validationErrors.array(), message: error.message });
    }

    planModel.getListIdByUser(req.user.id)
        .then(listId => {
            listModel.getCourses(listId)
                .then(courses => {
                    listModel.deleteCoursesList(listId)
                        .then(() => {
                            courseModel.updateEnrolledStudents({ inserts: [], deletes: courses })
                                .then(() => {
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