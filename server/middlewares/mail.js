/*
 * ------------------------ mail --------------------------------------
 * 
 * Package:         server
 * Module:          middlewares
 * File:            mail.js
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

// Import the module for creating a mail transporter
const nodemailer = require('nodemailer');

// Create nodemailer transporter associated with the email account
// used to send mails to users
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.TRANSPORTER_AUTH_EMAIL,
        pass: process.env.TRANSPORTER_AUTH_PASSWORD,
    }
});

module.exports = transporter;