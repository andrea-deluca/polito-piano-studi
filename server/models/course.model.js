/*
 * ------------------------ course.model --------------------------
 * 
 * Package:         server
 * Module:          models
 * File:            course.model.js
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

// Import the connection to the DB from the middleware
const db = require('../middlewares/db');

// Function to get all courses info
exports.getAllCourses = () => {
    return new Promise((resolve, reject) => {
        const query_courses = `
            SELECT C1.code, C1.name, C1.credits, C1.max_students as maxStudents, C1.enrolled_students as enrolledStudents,
                C1.preparatory_course as preparatoryCourse, C2.name as preparatoryCourseName
            FROM courses as C1 
            LEFT JOIN courses as C2 
            ON C1.preparatory_course = C2.code
            ORDER BY C1.name`;
        // Access to the db to get all courses info
        db.all(query_courses, [], (err, rows) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            // No courses found 
            else if (rows.length === 0) reject(new createError.NotFound('No courses found'));
            else {
                const courses = rows;
                const query_incompatibilities = `
                    SELECT C1.code, I.incompatible_course as incompatibleCourse, C2.name
                    FROM courses as C1 
                    LEFT JOIN incompatible_courses as I, courses as C2 
                    ON C1.code=I.course_code and I.incompatible_course=C2.code`;
                // Access to the db to get courses incompatibility info 
                db.all(query_incompatibilities, [], ((err, rows) => {
                    // An error occurs while accessing the DB
                    if (err) reject(new createError.InternalServerError(err.message));
                    // No incompatibilities found, resolve just courses info
                    else if (rows.length === 0) resolve(courses.map(course => ({
                        ...course,
                        preparatoryCourse: course.preparatoryCourse ? {
                            code: course.preparatoryCourse,
                            name: course.preparatoryCourseName
                        } : null,
                    })))
                    else {
                        // Builds an array of objects for incompatibilities info
                        const incompatibleCourses = rows.map(course => ({
                            code: course.code,
                            incompatibleCourses: [
                                ...rows.filter(c => c.code === course.code).map(c => ({ code: c.incompatibleCourse, name: c.name }))
                            ]
                        }));

                        // Builds an array of courses objects with all the info
                        const res = courses.map(course => ({
                            code: course.code,
                            name: course.name,
                            credits: course.credits,
                            maxStudents: course.maxStudents,
                            enrolledStudents: course.enrolledStudents,
                            preparatoryCourse: course.preparatoryCourse ? {
                                code: course.preparatoryCourse,
                                name: course.preparatoryCourseName
                            } : null,
                            ...incompatibleCourses.find(c => c.code === course.code)
                        }));

                        resolve(res)
                    }
                }))
            }
        })
    })
}

// Function to add an enrolled student to a course
exports.addEnrolledStudent = (course) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE courses SET enrolled_students = enrolled_students + 1 WHERE code = ?';
        // Access to the DB
        db.run(query, [course], (err) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            else resolve();
        })
    })
}

// Function to remove an enrolled student from a course
exports.removeEnrolledStudent = (course) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE courses SET enrolled_students = enrolled_students - 1 WHERE code = ?';
        // Access to the DB
        db.run(query, [course], (err) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            else resolve();
        })
    })
}

// Function to update enrolled students into courses
exports.updateEnrolledStudents = (updates) => {
    return Promise.all(updates.inserts.map(course => {
        // Add enrolled students to given courses
        return this.addEnrolledStudent(course);
    }).concat(updates.deletes.map(course => {
        // Remove enrolled students from given courses
        return this.removeEnrolledStudent(course);
    })))
}