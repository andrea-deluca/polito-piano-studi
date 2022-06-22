/*
 * ------------------------ Explore ------------------------------------
 * 
 * Package:         client
 * Module:          pages
 * File:            Explore.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21    
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useState, useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';

import { api } from '../services';
import { useNotification } from '../hooks';

import { UI } from '../components';

// Explore page
// -- Exported
const Explore = () => {
    const [courses, setCourses] = useState([]); // State to store all courses when API call resolved
    const notify = useNotification(); // Notification handler

    // Gets all courses
    useEffect(() => {
        api.courses.retrieveAll()
            .then(courses => setCourses(courses))
            .catch(err => notify.error(err))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (courses.length)
        return (
            <Row className='p-3 h-100'>
                <Col xs={{ span: 12 }} className="mb-5 mx-auto">
                    <h1 className='text-primary fw-bold'>Esplora</h1>
                    <p className='mt-4 fw-extralight text-muted'>Inizia a dare un'occhiata ai corsi offerti per essere pronto quando dovrai creare il tuo piano di studi.</p>
                </Col>
                <Col xs={{ span: 12 }}>
                    <Col xs={{ span: 12 }} className="mx-auto mb-5">
                        <div className='d-flex justify-content-between mb-5'>
                            <h3 className='fw-semibold text-primary'>Tutti i corsi offerti</h3>
                        </div>
                        <UI.CoursesList expandable courses={courses} />
                    </Col>
                </Col>
            </Row >
        );
}

export default Explore;