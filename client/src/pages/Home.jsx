/*
 * ------------------------ Home ---------------------------------------
 * 
 * Package:         client
 * Module:          pages
 * File:            Home.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-16
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { Link } from 'react-router-dom';

import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faSignature } from '@fortawesome/free-solid-svg-icons';

// Home page
// -- Exported
const Home = () => {
    return (
        <Row className='align-items-center h-100'>
            <Col xs={{ span: 12 }} xl={{ span: 10 }} className='d-flex flex-column align-items-center mx-auto'>
                <div className='text-center text-primary mb-5'>
                    <h1 className='fw-extrabold mb-3' style={{ fontSize: '4.5rem' }}>
                        Il nuovo piano di studi del PoliTO!
                    </h1>
                    <h3 className='my-1'>
                        Esplora i corsi offerti oppure accedi e crea il tuo piano di studi con <span className='fw-extrabold text-accent'>Study Plan</span>
                    </h3>
                </div>
                <ButtonGroup>
                    <Link to={"/login"}>
                        <Button variant='primary' size='lg' className='px-5 p-3 rounded-3 me-4'>
                            <FontAwesomeIcon icon={faRightToBracket} className="me-3" />
                            Login
                        </Button>
                    </Link>
                    <Link to={"/signup"}>
                        <Button variant='accent' size='lg' className='px-5 p-3 rounded-3'>
                            <FontAwesomeIcon icon={faSignature} className="me-3" />
                            Signup
                        </Button>
                    </Link>
                </ButtonGroup>
            </Col>
        </Row>
    );
}

export default Home;