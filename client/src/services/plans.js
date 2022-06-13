/*
 * ------------------------ plans -------------------------------------
 * 
 * Package:         client
 * Module:          services
 * File:            plans.js
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

import axios from "axios";

const plans = {
    getStudyPlan: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/plans')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message))
        })
    },

    getStudyPlanOptions: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/plans/type-options')
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message));
        })
    },

    createStudyPlan: (courses, plan) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/plans', { courses, plan })
                .then(() => resolve())
                .catch(err => reject(err.response.data.message));
        })
    },

    updateStudyPlan: (list, updates, credits, updateDate) => {
        return new Promise((resolve, reject) => {
            axios.put(`/api/plans/courses-list/${list}`, { updates, credits, updateDate })
                .then(() => resolve())
                .catch(err => reject(err.response.data.message));
        })
    },

    deleteStudyPlan: (list) => {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/plans/courses-list/${list}`)
                .then(() => resolve())
                .catch(err => reject(err.response.data.message));
        })
    }
}

export default plans;