/*
 * ------------------------ motion.config -----------------------------
 * 
 * Package:         client
 * Module:          configs
 * File:            motion.config.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Motion-Framer variants config
const variants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
}

// Motion-Framer transition config
const transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: .3
};

// Motion-Framer config
// -- Exported
const motionConfig = { variants, transition };

export default motionConfig;