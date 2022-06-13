/*
 * ------------------------ course.model --------------------------
 * 
 * Package:         server
 * Module:          models
 * File:            course.model.js
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

const createError = require('http-errors');

const db = require('../middlewares/db');

exports.getAllCourses = () => {
    return new Promise((resolve, reject) => {
        const query_courses = `
            SELECT C1.code, C1.name, C1.credits, C1.max_students as maxStudents, C1.enrolled_students as enrolledStudents,
                C1.preparatory_course as preparatoryCourse, C2.name as preparatoryCourseName
            FROM courses as C1 
            LEFT JOIN courses as C2 
            ON C1.preparatory_course = C2.code
            ORDER BY C1.name`;

        db.all(query_courses, [], (err, rows) => {
            if (err) reject(new createError.InternalServerError(err.message));
            else if (rows.length === 0) reject(new createError.NotFound('No courses found'));
            else {
                const courses = rows;
                const query_incompatibilities = `
                    SELECT C1.code, I.incompatible_course as incompatibleCourse, C2.name
                    FROM courses as C1 
                    LEFT JOIN incompatible_courses as I, courses as C2 
                    ON C1.code=I.course_code and I.incompatible_course=C2.code`;

                db.all(query_incompatibilities, [], ((err, rows) => {
                    if (err) reject(new createError.InternalServerError(err.message));
                    else if (rows.length === 0) resolve(courses)
                    else {
                        const incompatibleCourses = rows.map(course => ({
                            code: course.code,
                            incompatibleCourses: [
                                ...rows.filter(c => c.code === course.code).map(c => ({ code: c.incompatibleCourse, name: c.name }))
                            ]
                        }));

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

exports.updateEnrolledStudents = (updates) => {
    return new Promise((resolve, reject) => {
        const querySub = 'UPDATE courses SET enrolled_students = enrolled_students - 1 WHERE code = ?';
        const queryAdd = 'UPDATE courses SET enrolled_students = enrolled_students + 1 WHERE code = ?';

        const stmtSub = db.prepare(querySub);
        const stmtAdd = db.prepare(queryAdd);

        updates.deletes.forEach(courseToDelete => {
            stmtSub.run([courseToDelete], (err) => {
                if (err) return reject(new createError.InternalServerError('Error while updating courses'));
            })
        })

        updates.inserts.forEach(courseToInsert => {
            stmtAdd.run([courseToInsert], (err) => {
                if (err) return reject(new createError.InternalServerError('Error while updating courses list'));
            })

        });

        resolve();
    })
}