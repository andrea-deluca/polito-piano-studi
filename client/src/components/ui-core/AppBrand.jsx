/*
 * ------------------------ AppBrand ----------------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            AppBrand.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { Link } from "react-router-dom";

import { Navbar } from "react-bootstrap";

// AppBrand component
// -- Exported
const AppBrand = ({ link }) => {
    return (
        <Link to={link} className='text-decoration-none' style={{ transition: '.3s' }}>
            <Navbar.Brand className='fw-black fs-3 m-0'>
                Politecnico di Torino
                <small className="d-block fw-medium fs-5 lh-1">Study Plan</small>
            </Navbar.Brand>
        </Link>
    );
}

export default AppBrand;