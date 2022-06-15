/*
 * ------------------------ useStepper ----------------------------------
 * 
 * Package:         client
 * Module:          hooks
 * File:            useStepper.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-15
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useState } from "react"

// useStepper hook
const useStepper = () => {
    // stepper contains an active status, the current step and a possible "context"
    // where data can be stored temporary and used into stepper steps
    const [stepper, setStepper] = useState({
        active: false,
        current: 0,
        context: null
    })

    // Set active status
    const start = () => {
        setStepper((old) => ({ ...old, active: true }));
    }

    // Go to next step
    const next = () => {
        setStepper((old) => ({ ...old, current: old.current + 1 }))
    }

    // Put data into the local temporary context
    const data = {
        put: (data) => {
            setStepper((old) => ({ ...old, context: { ...old.context, ...data } }))
        },
    }

    return { ...stepper, start, next, data };
}

export default useStepper;