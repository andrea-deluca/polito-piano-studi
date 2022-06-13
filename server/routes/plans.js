/*
 * ------------------------ plans -----------------------------------
 * 
 * Package:         server
 * Module:          routes
 * File:            plans.js
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

const express = require('express');
const router = express.Router();

const createError = require('http-errors');

const { validationResult } = require('express-validator');

const courseModel = require('../models/course.model');
const planModel = require('../models/study-plan.model');
const listModel = require('../models/courses-list.model');

const { withAuth } = require('../middlewares/session');

router.get('/', withAuth, (req, res) => {
    planModel.getStudyPlan(req.user.id)
        .then(plan => {
            res.status(200).json(plan);
        })
        .catch(err => {
            res.status(err.statusCode).json({ message: err.message });
        })
})

router.get('/type-options', withAuth, (req, res) => {
    planModel.getStudyPlanOptions()
        .then(options => res.status(200).json(options))
        .catch(err => res.status(err.statusCode).json({ message: err.message }));
})

router.post('/', withAuth, (req, res) => {
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

router.put('/courses-list/:id', withAuth, (req, res) => {
    courseModel.updateEnrolledStudents(req.body.updates)
        .then(() => {
            listModel.updateCoursesList(req.params.id, req.body.updates)
                .then(() => {
                    planModel.updateStudyPlan(req.user.id, req.body.credits, req.body.updateDate)
                        .then(() => res.status(200).end())
                        .catch(err => res.status(err.statusCode).json({ message: err.message }));
                })
                .catch(err => res.status(err.statusCode).json({ message: err.message }));
        })
        .catch(err => res.status(err.statusCode).json({ message: err.message }));
})

router.delete('/courses-list/:id', withAuth, (req, res) => {
    listModel.getCourses(req.params.id)
        .then(courses => {
            courseModel.updateEnrolledStudents({ inserts: [], deletes: courses })
                .then(() => {
                    listModel.deleteCoursesList(req.params.id)
                        .then(() => {
                            planModel.deleteStudyPlan(req.user.id)
                                .then(() => res.status(200).end())
                                .catch(err => res.status(err.statusCode).json(err.message));
                        })
                        .catch(err => res.status(err.statusCode).json(err.message));
                })
                .catch(err => res.status(err.statusCode).json(err.message));
        })
        .catch(err => res.status(err.statusCode).json(err.message));
})

module.exports = router;