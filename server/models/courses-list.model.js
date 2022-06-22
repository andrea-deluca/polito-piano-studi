/*
 * ------------------------ courses-list.model -------------------------
 * 
 * Package:         server
 * Module:          models
 * File:            courses-list.model.js
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

// Function to get courses from a list associated with a study plan
exports.getCourses = (list) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT course_code as course FROM courses_lists WHERE id = ?';
        // Access to the DB
        db.all(query, [list], (err, rows) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message))
            // No courses found 
            else if (rows.length === 0) reject(new createError.NotFound('No courses found in list'));
            else resolve(rows.map(row => row.course));
        })
    })
}

// Function to get the next id to use to store a new list
exports.getNextId = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT max(id) as lastId FROM courses_lists';
        // Access to the DB
        db.get(query, [], (err, row) => {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            // If there are no lists, resolve 1 
            else if (!row) resolve(1);
            else resolve(row.lastId + 1);
        })
    })
}

// Function to insert a new course into a list
exports.insertCourse = (list, course) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO courses_lists (id, course_code) VALUES (?, ?)';
        // Access to the DB
        db.run(query, [list, course], (err) => {
            // An error occurs while accessing the DB
            if (err) return reject(new createError.InternalServerError(err.message));
            else resolve();
        })
    })
}

// Function to remove a course from a list
exports.removeCourse = (list, course) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM courses_lists WHERE id = ? and course_code = ?';
        // Access to the DB
        db.run(query, [list, course], (err) => {
            // An error occurs while accessing the DB
            if (err) return reject(new createError.InternalServerError(err.message));
            else resolve();
        })
    })
}

// Function to create a new courses list asociated with a study plan
exports.createCoursesList = (courses) => {
    return new Promise((resolve, reject) => {
        // Gets next id to use to store the new list
        this.getNextId()
            .then(id => {
                const query = 'INSERT INTO courses_lists (id, course_code) VALUES (?, ?)';
                const stmt = db.prepare(query);
                courses.map(course => {
                    stmt.run([id, course], function (err) {
                        if (err) return reject(new createError.InternalServerError("Error while creating courses list"));
                    })
                });
                resolve(id);
            })
            .catch(err => reject(err))
    })
}

// Function to update a list inserting and deleting courses
exports.updateCoursesList = (list, updates) => {
    return Promise.all(updates.inserts.map(course => {
        // Inserts courses into the list
        return this.insertCourse(list, course);
    }).concat(updates.deletes.map(course => {
        // Removes courses from the list
        return this.removeCourse(list, course);
    })))
}

// Function to delete a list and all courses inside it
exports.deleteCoursesList = (list) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM courses_lists WHERE id = ?';
        // Access to the DB
        db.run(query, [list], function (err) {
            // An error occurs while accessing the DB
            if (err) reject(new createError.InternalServerError(err.message));
            else resolve();
        })
    })
}