/*
 * ------------------------ sidebarItems -------------------------------
 * 
 * Package:         client
 * Module:          constants
 * File:            sidebarItems.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */


import { faRocket, faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

// Logged in Sidebar navigation links definition
// -- Exported
const sidebarItems = [
    {
        section: 'Navigation', links: [
            { label: 'Dashboard', url: '/dashboard', icon: faRocket },
            { label: 'Il mio piano di studio', url: '/study-plan', icon: faGraduationCap },
            { label: 'Esplora', url: '/esplora', icon: faBook },
        ]
    },
];

export default sidebarItems;