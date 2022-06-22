/*
 * ------------------------ plans -------------------------------------
 * 
 * Package:         client
 * Module:          services
 * File:            plans.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21      
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const plans = {
    getStudyPlan: () => {
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/api/study-plans`, { withCredentials: true })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message))
        })
    },

    getStudyPlanOptions: () => {
        return new Promise((resolve, reject) => {
            axios.get(`${BASE_URL}/api/study-plans/types`, { withCredentials: true })
                .then(res => resolve(res.data))
                .catch(err => reject(err.response.data.message));
        })
    },

    createStudyPlan: (updates, plan) => {
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/api/study-plans`, { updates, plan }, { withCredentials: true })
                .then(() => resolve())
                .catch(err => reject(err.response.data.message));
        })
    },

    updateStudyPlan: (id, updates, plan) => {
        return new Promise((resolve, reject) => {
            axios.put(`${BASE_URL}/api/study-plans/${id}`, { updates, plan }, { withCredentials: true })
                .then(() => resolve())
                .catch(err => reject(err.response.data.message));
        })
    },

    deleteStudyPlan: (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${BASE_URL}/api/study-plans/${id}`, { withCredentials: true })
                .then(() => resolve())
                .catch(err => reject(err.response.data.message));
        })
    }
}

export default plans;