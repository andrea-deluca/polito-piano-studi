/*
 * ------------------------ navbarItems -------------------------------
 * 
 * Package:         client
 * Module:          constants
 * File:            navbarItems.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { faBook, faHome, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

// Navbar navigation links definition
// -- Exported
const navbarItems = [
    { label: "Home", url: "/", icon: faHome },
    { label: "Esplora", url: "/explore", icon: faBook },
    { label: "Login", url: "/login", icon: faRightToBracket },
];

export default navbarItems;