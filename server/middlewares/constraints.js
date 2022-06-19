'use strict';

const createError = require('http-errors');
const courseModel = require('../models/course.model');
const planModel = require('../models/study-plan.model');
const listModel = require('../models/courses-list.model');

exports.withConstraints = (req, res, next) => {
    planModel.getListIdByUser(req.user.id)
        .then(listId => {
            listModel.getCourses(listId)
                .then(planCourses => {
                    courseModel.getAllCourses()
                        .then(courses => {
                            const updatedPlan = courses.filter(course => {
                                return (!req.body.updates.deletes.includes(course.code) &&
                                    (req.body.updates.inserts.includes(course.code) || planCourses.includes(course.code)))
                            })

                            let validationError = false;

                            updatedPlan.forEach(course => {
                                if (course.preparatoryCourse && !updatedPlan.includes(courses.find(c => c.code === course.preparatoryCourse.code)))
                                    validationError = true;
                                else if (course.incompatibleCourses && course.incompatibleCourses.find(incompatibleCourse => updatedPlan.includes(courses.find(course => course.code === incompatibleCourse.code))))
                                    validationError = true;
                                else if (course.maxStudents && course.maxStudents === course.enrolledStudents)
                                    validationError = true;
                            })

                            if (validationError) {
                                const error = new createError.UnprocessableEntity('Study plan constraints not respected')
                                return res.status(error.statusCode).json({ message: error.message });
                            } else return next();

                        })
                        .catch(err => {
                            return res.status(err.statusCode).json({ message: err.message })
                        })
                })
                .catch(err => {
                    return res.status(err.statusCode).json({ message: err.message })
                })
        })
        .catch(err => res.status(err.statusCode).json({ message: err.message }))
}