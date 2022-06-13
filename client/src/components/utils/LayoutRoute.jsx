import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Container, Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

import { useSession } from "../../hooks";

import ViewTransition from "./ViewTransition";
import { Navbar, Footer, Sidebar } from "../ui-core";

const LayoutRoute = () => {
    const [show, setShow] = useState(true);
    const session = useSession();

    return (
        <Container fluid id="app-container" className="app-container py-3" style={{ overflowX: 'hidden' }}>
            {!session.loggedIn ?
                <Navbar /> :
                <div className="d-xxl-none d-block">
                    <Navbar />
                </div>
            }
            {session.loggedIn ?
                <Row className='d-flex flex-fill p-3'>
                    <Sidebar show={show} />
                    <Col xxl={{ span: show ? 8 : 10, offset: show ? 3 : 1 }} className="px-5" style={{ transition: 'all .3s' }}>
                        <Button variant='outline-gray' size='sm' className='d-none d-xxl-block mb-5 text-primary border-0 rounded-3' onClick={() => setShow(!show)}>
                            <FontAwesomeIcon icon={faList} className='me-2 opacity-50' />
                            <small className='fw-medium'>Sidebar</small>
                        </Button>
                        <ViewTransition>
                            <Outlet />
                        </ViewTransition>
                    </Col>
                </Row> :
                <ViewTransition>
                    <Outlet />
                </ViewTransition>
            }
            <Footer />
        </Container>
    );
}

export default LayoutRoute;