/*
 * ------------------------ study-plan.validations ---------------------
 * 
 * Package:         server
 * Module:          validations
 * File:            study-plan.validations.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

'use strict';

// Import modules for validation checks
const { body, param } = require('express-validator');

// Validation checks for the request body of the route that
// perform the creation of a new study plan
exports.createStudyPlan = [
    body('updates').isObject({ strict: true }).exists({ checkNull: true }),
    body('updates.inserts').isArray().exists({ checkNull: true }),
    body('updates.deletes').isArray({ max: 0 }).exists({ checkNull: true }),
    body('plan').isObject({ strict: true }).exists({ checkNull: true }),
    body('plan.type').isInt({ min: 1, max: 2 }).exists({ checkFalsy: true }),
    body('plan.credits').if(body('plan.type').equals(1)).isInt({ min: 60, max: 80 }).exists({ checkFalsy: true }),
    body('plan.credits').if(body('plan.type').equals(2)).isInt({ min: 20, max: 40 }).exists({ checkFalsy: true }),
    body('plan.createDate').isISO8601({ strict: true, strictSeparator: true }).exists({ checkFalsy: true }),
    body('plan.updateDate').isISO8601({ strict: true, strictSeparator: true }).exists({ checkFalsy: true }),
];

// Validation checks for the request body and params of the route that
// perform the update of a study plan
exports.updateStudyPlan = [
    body('updates').isObject({ strict: true }).exists({ checkNull: true }),
    body('updates.inserts').isArray().exists({ checkNull: true }),
    body('updates.deletes').isArray().exists({ checkNull: true }),
    body('plan').isObject({ strict: true }).exists({ checkNull: true }),
    body('plan.type').isInt({ min: 1, max: 2 }).exists({ checkFalsy: true }),
    body('plan.credits').if(body('plan.type').equals(1)).isInt({ min: 60, max: 80 }).exists({ checkFalsy: true }),
    body('plan.credits').if(body('plan.type').equals(2)).isInt({ min: 20, max: 40 }).exists({ checkFalsy: true }),
    body('plan.updateDate').isISO8601({ strict: true, strictSeparator: true }).exists({ checkFalsy: true }),
    param('id').isInt().exists({ checkFalsy: true }),
];

// Validation checks for the request params of the route that
// perform the deletion of a study plan
exports.deleteStudyPlan = [
    param('id').isInt().exists({ checkFalsy: true }),
];