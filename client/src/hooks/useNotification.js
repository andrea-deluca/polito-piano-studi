/*
 * ------------------------ useNotification ---------------------------
 * 
 * Package:         client
 * Module:          hooks
 * File:            useNotification.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { toast } from "react-toastify";

import { notificationConfig } from '../configs';

// useNotification hook
const useNotification = () => {
    // The notify object is a notification handler from which
    // different types of notifications can be runned
    const notify = {
        // Error notification
        error: (error) => {
            toast.error(error, {
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
                ...notificationConfig,
            });
        },

        // Warning notification
        warning: (message) => {
            toast.warning(message, {
                type: toast.TYPE.WARNING,
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
                ...notificationConfig,
            });
        },

        // Success notification
        success: (response) => {
            toast.success(response, {
                type: toast.TYPE.SUCCESS,
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
                ...notificationConfig,
            });
        },

        // Waiting for a promise notification handler
        promise: {
            // Loading notification
            loading: (message) => {
                return toast.loading(message, {
                    type: toast.TYPE.DEFAULT,
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'colored',
                    ...notificationConfig,
                });
            },

            // Success notification when a promise is resolved
            success: (id, response) => {
                toast.update(id, {
                    isLoading: false,
                    render: response,
                    type: toast.TYPE.SUCCESS,
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'colored',
                    ...notificationConfig,
                });
            },

            // Error notification when a promise is rejected
            error: (id, error) => {
                toast.update(id, {
                    isLoading: false,
                    render: error,
                    type: toast.TYPE.ERROR,
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'colored',
                    ...notificationConfig,
                });
            }
        }
    }

    return notify;
}

export default useNotification;