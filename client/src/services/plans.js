/*
 * ------------------------ plans -------------------------------------
 * 
 * Package:         client
 * Module:          services
 * File:            plans.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-20
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import axios from "axios";

const plans = {
    getStudyPlan: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/study-plans')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message))
        })
    },

    getStudyPlanOptions: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/study-plans/types')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message));
        })
    },

    createStudyPlan: (courses, plan) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/study-plans', { courses, plan })
                .then(() => resolve())
                .catch(err => reject(err.response.data.message));
        })
    },

    updateStudyPlan: (id, updates, plan) => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/study-plans/${id}`, { updates, plan })
                .then(() => resolve())
                .catch(err => reject(err.response.data.message));
        })
    },

    deleteStudyPlan: (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/study-plans/${id}`)
                .then(() => resolve())
                .catch(err => reject(err.response.data.message));
        })
    }
}

export default plans;