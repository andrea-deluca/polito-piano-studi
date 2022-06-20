/*
 * ------------------------ ViewTransition ----------------------------
 * 
 * Package:         client
 * Module:          components/utils
 * File:            ViewTransition.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { motion } from 'framer-motion';

import { motionConfig } from '../../configs';

// ViewTransition component
// -- Exported
const ViewTransition = ({ children }) => {
    return (
        <motion.div
            initial='initial'
            animate='in'
            exit='out'
            variants={motionConfig.variants}
            transition={motionConfig.transition}
            className='flex-fill'
        >
            {children}
        </motion.div>
    );
}

export default ViewTransition;