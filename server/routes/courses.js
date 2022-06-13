/*
 * ------------------------ courses -----------------------------------
 * 
 * Package:         server
 * Module:          routes
 * File:            courses.js
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

router.get('/all', (req, res) => {
    courseModel.getAllCourses()
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(err => {
            res.status(err.statusCode).json({ message: err.message });
        })
})

module.exports = router;