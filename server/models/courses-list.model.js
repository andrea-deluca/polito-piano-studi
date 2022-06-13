'use strict';

const createError = require('http-errors');

const db = require('../middlewares/db');

exports.getCourses = (list) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT course_code as course FROM courses_lists WHERE id = ?';
        db.all(query, [list], (err, rows) => {
            if (err) reject(new createError.InternalServerError('Error while getting courses from list'))
            else if (rows.length === 0) reject(new createError.NotFound('No courses found in list'));
            else resolve(rows.map(row => row.course));
        })
    })
}

exports.getNextId = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT max(id) as lastId FROM courses_lists';
        db.get(query, [], (err, row) => {
            if (err) reject(new createError.InternalServerError('Error while getting next courses list id'));
            else if (!row) resolve(1);
            else resolve(row.lastId + 1);
        })
    })
}

exports.createCoursesList = (courses) => {
    return new Promise((resolve, reject) => {
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

exports.updateCoursesList = (list, updates) => {
    return new Promise((resolve, reject) => {
        const queryDelete = 'DELETE FROM courses_lists WHERE id = ? and course_code = ?';
        const queryInsert = 'INSERT INTO courses_lists (id, course_code) VALUES (?, ?)';

        const deleteStmt = db.prepare(queryDelete);
        const insertStmt = db.prepare(queryInsert);

        updates.deletes.forEach(courseToDelete => {
            deleteStmt.run([list, courseToDelete], (err) => {
                if (err) return reject(new createError.InternalServerError('Error while updating courses list'));
            })
        })

        updates.inserts.forEach(courseToInsert => {
            insertStmt.run([list, courseToInsert], (err) => {
                if (err) return reject(new createError.InternalServerError('Error while updating courses list'));
            })

        });

        resolve();
    })
}

exports.deleteCoursesList = (list) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM courses_lists WHERE id = ?';
        db.run(query, [list], function (err) {
            if (err) reject(new createError.InternalServerError('Error while deleting courses list'));
            else resolve();
        })
    })
}