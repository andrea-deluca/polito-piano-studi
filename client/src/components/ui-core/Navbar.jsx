/*
 * ------------------------ Navbar ------------------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            Navbar.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { Row, Col, Navbar as NavigationBar, Container, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { api } from "../../services";
import { useSession } from "../../hooks";
import { navbarItems, sidebarItems } from "../../constants";

import HamburgerMenu from "./HamburgerMenu";
import AppBrand from './AppBrand';
import NavigationLinks from "./NavigationLinks";

// Navigation component
// -- Not exported
const Navigation = () => {
    const session = useSession(); // Session handler

    // Perform logout of the logged in user
    const handleLogout = () => {
        api.sessions.logout()
            .then(() => {
                session.updateInfo();
            })
    }

    return (
        <Nav className="d-none d-xl-flex align-items-center">
            {!session.loggedIn ?
                <NavigationLinks variant="navbar" items={navbarItems} /> :
                <NavigationLinks variant="navbar" items={sidebarItems}>
                    <Button variant='outline-secondary' className='align-items-center border-0 rounded-3 px-2' onClick={handleLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-3' />
                        <small>Logout</small>
                    </Button>
                </NavigationLinks>
            }
        </Nav>
    );
}

// Navbar component
// -- Exported
const Navbar = () => {
    return (
        <Row className="mb-5">
            <Col xs={{ span: 12 }}>
                <NavigationBar variant='primary' expand='lg'>
                    <Container fluid>
                        <AppBrand link="/" />
                        <HamburgerMenu />
                        <Navigation />
                    </Container>
                </NavigationBar>
            </Col>
        </Row>
    );
}

export default Navbar;