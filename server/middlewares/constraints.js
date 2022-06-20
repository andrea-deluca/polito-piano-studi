/*
 * ------------------------ constraints --------------------------------
 * 
 * Package:         server
 * Module:          middlewares
 * File:            constraints.js
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

// Import models/DAOs (Data Access Objects)
const courseModel = require('../models/course.model');
const planModel = require('../models/study-plan.model');
const listModel = require('../models/courses-list.model');

// Checks if there are some errors associated with courses constraints
const checkForConstraintsError = (planCourses, courses) => {
    const constraintError = false;
    planCourses.forEach(course => {
        // Checks for propedeuticity error
        if (course.preparatoryCourse && !planCourses.includes(courses.find(c => c.code === course.preparatoryCourse.code)))
            constraintError = true;
        // Checks for incompatibility error
        else if (course.incompatibleCourses && course.incompatibleCourses.find(incompatibleCourse => planCourses.includes(courses.find(course => course.code === incompatibleCourse.code))))
            constraintError = true;
        // Checks for max enrolled students error
        else if (course.maxStudents && course.maxStudents === course.enrolledStudents)
            constraintError = true;
    })
    return constraintError;
}

// Checks if there is some constraints error
exports.withConstraints = (req, res, next) => {
    // Gets all the courses
    courseModel.getAllCourses()
        .then(courses => {
            // Gets the courses list id of the study plan associated with
            // the logged in user, if they exist
            planModel.getListIdByUser(req.user.id)
                .then(listId => {
                    // If exists, then gets all the courses of the list
                    listModel.getCourses(listId)
                        .then(planCourses => {
                            // Builds an updated list of courses according to the updates sent
                            // with the http request
                            const updatedPlan = courses.filter(course => {
                                return (!req.body.updates.deletes.includes(course.code) &&
                                    (req.body.updates.inserts.includes(course.code) || planCourses.includes(course.code)))
                            })

                            // Checks if there is some constraints error
                            if (checkForConstraintsError(updatedPlan, courses)) {
                                // If there is some error, sends an HTTP error as response
                                const error = new createError.UnprocessableEntity('Study plan constraints not respected')
                                return res.status(error.statusCode).json({ message: error.message });
                            } else return next();
                        })
                        .catch(err => {
                            return res.status(err.statusCode).json({ message: err.message })
                        })
                })
                .catch(err => {
                    if (err.statusCode !== 404)
                        return res.status(err.statusCode).json({ message: err.message })
                    else {
                        // If there is no study plan and courses list for the logged in user,
                        // the request is done to create it, so builds a list of courses
                        // according to the request body
                        const updatedPlan = courses.filter(course => {
                            return req.body.updates.inserts.includes(course.code)
                        })

                        // Checks for some constraint error
                        if (checkForConstraintsError(updatedPlan, courses)) {
                            // If there is some error, sends an HTTP error as response
                            const error = new createError.UnprocessableEntity('Study plan constraints not respected')
                            return res.status(error.statusCode).json({ message: error.message });
                        } else return next();
                    }
                })
        })
        .catch(err => {
            return res.status(err.statusCode).json({ message: err.message })
        })
}