/*
 * ------------------------ navbarItems -------------------------------
 * 
 * Package:         client
 * Module:          constants
 * File:            navbarItems.js
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

import { faHome, faMap, faHeadset, faCircleQuestion, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

// Navbar navigation links definition
// -- Exported
const navbarItems = [
    { label: "Home", url: "/", icon: faHome },
    { label: "Explore", url: "/explore", icon: faMap },
    { label: "Support", url: "/support", icon: faHeadset },
    { label: "FAQ", url: "/faq", icon: faCircleQuestion },
    { label: "Login", url: "/login", icon: faRightToBracket },
];

export default navbarItems;