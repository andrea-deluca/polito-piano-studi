/*
 * ------------------------ sessions ----------------------------------
 * 
 * Package:         client
 * Module:          services
 * File:            sessions.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21     
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import axios from 'axios';

const sessions = {
    login: (credentials) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/sessions/password', credentials, { withCredentials: true })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message))
        })
    },

    logout: () => {
        return new Promise((resolve, reject) => {
            axios.delete('/api/sessions/current')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message))
        })
    },

    getUserInfo: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/sessions/current')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message))
        })
    }
}

export default sessions;