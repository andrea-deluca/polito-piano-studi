/*
 * ------------------------ useConfirm --------------------------------------
 * 
 * Package:         client
 * Module:          hooks
 * File:            useConfirm.js
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

// useConfirm hook
const useConfirm = (callback) => {
    const [show, setShow] = useState(false); // Set while confirmation request is open

    // Shows the confirmation request
    const onShow = () => {
        setShow(true);
    }

    // Hides the confirmation request
    const onHide = () => {
        setShow(false);
    }

    // When the request is confermed, performs callback given
    // and then hides the confirmation request
    const onConfirm = () => {
        callback();
        onHide();
    }

    return [show, { onShow, onHide, onConfirm }];
}

export default useConfirm;