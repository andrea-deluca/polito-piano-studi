/*
 * ------------------------ db ----------------------------------------
 * 
 * Package:         server
 * Module:          middlewares
 * File:            db.js
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

// Import the module for connecting to the DB
const sqlite = require('sqlite3');

// Connect the server to the Database
const db = new sqlite.Database('database.db', (err) => {
    // If an error occurs, the server throws it and goes down
    if (err) throw err;
})

module.exports = db;