/*
 * ------------------------ NavigationLinks ----------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            NavigationLinks.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

// NavigationLinks component
// -- Exported
const NavigationLinks = ({ items, onHide, variant, children }) => {

    // Dynamic classes
    const navlinkClasses = classNames({
        "navigation-item fw-bold text-primary text-decoration-none": true,
        "mx-4 px-2": variant === "navbar", // Navbar links style
        "offcanvas-item mb-5": variant === "menu" // Hamburger menu links style
    })

    return (
        <>
            {items.map((item, index) => {
                if (item.section)
                    return item.links.map((link, index) => {
                        return (
                            <NavLink key={index} to={link.url} className={navlinkClasses}
                                onClick={onHide} style={({ isActive }) =>
                                    isActive ? { opacity: '100%' } : { opacity: '50%' }}>
                                <FontAwesomeIcon icon={link.icon} className='me-3' />
                                {link.label}
                            </NavLink>
                        );
                    })
                else return (
                    <NavLink key={index} to={item.url} className={navlinkClasses}
                        onClick={onHide} style={({ isActive }) =>
                            isActive ? { opacity: '100%' } : { opacity: '50%' }}>
                        <FontAwesomeIcon icon={item.icon} className='me-3' />
                        {item.label}
                    </NavLink>
                );
            })}
            {children}
        </>
    );
}

export default NavigationLinks;