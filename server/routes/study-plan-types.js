/*
 * ------------------------ study-plan-types --------------------------
 * 
 * Package:         server
 * Module:          routes
 * File:            study-plan-types.js
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

// Import session middleware to check if the user is authenticated
const { withAuth } = require('../middlewares/session');

// Import models/DAOs (Data Access Objects)
const planTypeModel = require('../models/study-plan-type.model');

// GET /api/study-plans/types
// Route to get study plan types info
router.get('/', withAuth, (req, res) => {
    // Gets study plan types info
    planTypeModel.getStudyPlanOptions()
        .then(options => res.status(200).json(options))
        .catch(err => res.status(err.statusCode).json({ message: err.message }));
})

module.exports = router;