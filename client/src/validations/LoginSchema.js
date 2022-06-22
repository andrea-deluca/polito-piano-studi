/*
 * ------------------------ LoginSchema -------------------------------
 * 
 * Package:         client
 * Module:          validations
 * File:            LoginSchema.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import * as Yup from 'yup';

// LoginSchema validation
// -- Exported
const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export default LoginSchema;