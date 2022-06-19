/*
 * ------------------------ study-plan-types --------------------------
 * 
 * Package:         server
 * Module:          routes
 * File:            study-plan-types.js
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

const planTypeModel = require('../models/study-plan-type.model');

const { withAuth } = require('../middlewares/session');

router.get('/', withAuth, (req, res) => {
    planTypeModel.getStudyPlanOptions()
        .then(options => res.status(200).json(options))
        .catch(err => res.status(err.statusCode).json({ message: err.message }));
})

module.exports = router;