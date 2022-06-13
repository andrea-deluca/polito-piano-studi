import { NavLink } from "react-router-dom";

import { Row, Col, Navbar as NavigationBar, Container, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { api } from "../../services";
import { useSession } from "../../hooks";

import { navbarItems, sidebarItems } from "../../constants";

import HamburgerMenu from "./HamburgerMenu";
import AppBrand from './AppBrand';

const Navigation = () => {
    const session = useSession();

    const handleLogout = () => {
        api.sessions.logout()
            .then(() => {
                session.logout();
            })
    }

    return (
        <Nav className="d-none d-xl-flex align-items-center">
            {!session.loggedIn ? navbarItems.map((item, index) => {
                return (
                    <NavLink key={index} to={item.url} className='navigation-item fw-bold text-primary text-decoration-none me-5 px-2' style={({ isActive }) =>
                        isActive ? { opacity: '100%' } : { opacity: '50%' }}>
                        <FontAwesomeIcon icon={item.icon} className='me-3' />
                        {item.text}
                    </NavLink>
                );
            }) : <>
                {sidebarItems.map((section) => {
                    return section.links.map((item, index) => {
                        return (
                            <NavLink key={index} to={item.url} className='navigation-item fw-bold text-primary text-decoration-none me-5 px-2' style={({ isActive }) =>
                                isActive ? { opacity: '100%' } : { opacity: '50%' }}>
                                <FontAwesomeIcon icon={item.icon} className='me-3' />
                                {item.label}
                            </NavLink>
                        );
                    })
                })}
                <Button variant='outline-secondary' className='nd-flex align-items-center border-0 rounded-3 px-2' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-3' />
                    <small>Logout</small>
                </Button>
            </>
            }
        </Nav>
    );
}

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