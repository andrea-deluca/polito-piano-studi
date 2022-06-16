/*
 * ------------------------ Login --------------------------------------
 * 
 * Package:         client
 * Module:          pages
 * File:            Login.jsx
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

import { Row, Col } from 'react-bootstrap';

import { Forms } from '../components';

// Login page
// -- Exported
const Login = () => {
    return (
        <Row className='align-items-center flex-fill p-3 h-100'>
            <Col xs={{ span: 12 }} md={{ span: 10 }} xl={{ span: 6 }} className="mx-auto">
                <h1 className='fw-bold text-primary'>Login</h1>
                <p className='mt-4 fw-extralight text-muted'>Inserisci il tuo indirizzo email e la tua password per accedere.</p>
                <Forms.LoginForm />
            </Col>
        </Row>
    );
}

export default Login;