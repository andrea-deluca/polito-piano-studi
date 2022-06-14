/*
 * ------------------------ HamburgerMenu -----------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            HamburgerMenu.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-14
 * 
 * Used in:         components/ui-core/Navbar
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Offcanvas, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { api } from "../../services";
import { useSession } from "../../hooks";
import { navbarItems, sidebarItems } from "../../constants";

import AnimatedCard from "./AnimatedCard";
import NavigationLinks from "./NavigationLinks";

// HamburgerMenu component
// -- Exported
const HamburgerMenu = () => {
    const [show, setShow] = useState(false); // Set while menu is open
    const session = useSession(); // Session handler

    // Perform logout of the logged in user
    const handleLogout = () => {
        api.sessions.logout()
            .then(() => {
                session.logout();
            })
    }

    return (
        <div className="d-xl-none">
            <Button variant="outline-primary" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <Offcanvas show={show} onHide={() => setShow(false)} placement='end'>
                <Offcanvas.Header>
                    <Offcanvas.Title className="p-3 text-primary opacity-50 fw-light">Menu</Offcanvas.Title>
                    <Button variant="outline-primary" className="border-0" onClick={() => setShow(false)}>
                        <FontAwesomeIcon icon={faClose} />
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="fs-5 d-flex mt-4 mb-5 px-4">
                        <div className="d-flex flex-column">
                            {!session.loggedIn ?
                                <NavigationLinks variant="menu" items={navbarItems} onHide={() => setShow(false)} /> :
                                <NavigationLinks variant="menu" items={sidebarItems} onHide={() => setShow(false)} />
                            }
                        </div>
                    </Nav>
                    {!session.loggedIn ?
                        <Link to='/signup' className="text-decoration-none">
                            <AnimatedCard title={"Non hai un account? Reigistrati ora"} height={200}>
                                Ci vuole solo un attimo... Una volta completata la registrazione, avrai la possibilità
                                di accedere e creare il tuo piano di studio.
                            </AnimatedCard>
                        </Link> :
                        <Button variant='secondary' className='d-flex align-items-center rounded-3 p-3 w-100' onClick={handleLogout}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-4' />
                            <small>Logout</small>
                        </Button>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default HamburgerMenu;