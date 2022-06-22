/*
 * ------------------------ courses -----------------------------------
 * 
 * Package:         server
 * Module:          routes
 * File:            courses.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-20
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

const express = require('express');
const router = express.Router();

// Import models/DAOs (Data Access Objects)
const courseModel = require('../models/course.model');

// GET /api/courses
// Route to get all courses info
router.get('/all', (req, res) => {
    courseModel.getAllCourses()
        .then(courses => res.status(200).json(courses))
        .catch(err => res.status(err.statusCode).json({ message: err.message }))
})

module.exports = router;