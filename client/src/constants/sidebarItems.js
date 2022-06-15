/*
 * ------------------------ sidebarItems -------------------------------
 * 
 * Package:         client
 * Module:          constants
 * File:            sidebarItems.js
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


import { faRocket, faBook, faGraduationCap, faUserAstronaut, faGear } from '@fortawesome/free-solid-svg-icons';

// Logged in Sidebar navigation links definition
// -- Exported
const sidebarItems = [
    {
        section: 'Core', links: [
            { label: 'Dashboard', url: '/dashboard', icon: faRocket },
            { label: 'Il mio piano di studio', url: '/plan', icon: faGraduationCap },
            { label: 'Esplora', url: '/explore', icon: faBook },
        ]
    },
    {
        section: 'User', links: [
            { label: 'Account', url: '/account', icon: faUserAstronaut },
            { label: 'Settings', url: '/settings', icon: faGear },
        ]
    },
];

export default sidebarItems;