/*
 * ------------------------ courses -----------------------------------
 * 
 * Package:         client
 * Module:          services
 * File:            courses.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21    
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import axios from "axios";

const courses = {
    retrieveAll: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/courses/all')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message))
        })
    }
}

export default courses;