import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { Button, Offcanvas, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { api } from "../../services";
import { useSession } from "../../hooks";

import { navbarItems, sidebarItems } from "../../constants";

import AnimatedCard from "./AnimatedCard";

const HamburgerMenu = () => {
    const [show, setShow] = useState(false);
    const session = useSession();

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
                                navbarItems.map((item, index) => {
                                    return (
                                        <NavLink key={index} to={item.url} className="navigation-item offcanvas-item fw-bold text-primary text-decoration-none me-5 mb-5"
                                            onClick={() => setShow(false)} style={({ isActive }) =>
                                                isActive ? { opacity: '100%' } : { opacity: '50%' }}>
                                            <FontAwesomeIcon icon={item.icon} className='me-3' />
                                            {item.text}
                                        </NavLink>
                                    );
                                }) : sidebarItems.map((section) => {
                                    return section.links.map((item, index) => {
                                        return (
                                            <NavLink key={index} to={item.url} className="navigation-item offcanvas-item fw-bold text-primary text-decoration-none me-5 mb-5"
                                                onClick={() => setShow(false)} style={({ isActive }) =>
                                                    isActive ? { opacity: '100%' } : { opacity: '50%' }}>
                                                <FontAwesomeIcon icon={item.icon} className='me-3' />
                                                {item.label}
                                            </NavLink>
                                        );
                                    })
                                })
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