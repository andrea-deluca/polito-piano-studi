/*
 * ------------------------ Footer ------------------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            Footer.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

// Footer component
// -- Exported
const Footer = () => {
    return (
        <Row className='mb-3 mt-5'>
            <Col xs={{ span: 12 }}>
                <div className="d-flex justify-content-between px-4">
                    <h6 className='text-dark opacity-75'>Copyright &copy; 2022 Andrea Deluca</h6>
                    <div>
                        <a href="http://github.com" target="_blank" rel="noopener noreferrer" className='link-dark'>
                            <FontAwesomeIcon icon={faGithub} size='xl' className='me-4' />
                        </a>
                        <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer" className='link-dark'>
                            <FontAwesomeIcon icon={faLinkedinIn} size='xl' />
                        </a>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default Footer;