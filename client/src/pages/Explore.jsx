import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { useNotification } from '../hooks';
import { api } from '../services';

import CoursesList from '../components/ui-core/CoursesList';

const Explore = () => {
    const [courses, setCourses] = useState([]);
    const notify = useNotification();

    useEffect(() => {
        api.courses.retrieveAll()
            .then(courses => setCourses(courses))
            .catch(err => notify.error(err))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (courses.length)
        return (
            <Row className='p-3 h-100'>
                <Col xs={{ span: 12 }} className="mb-5">
                    <h1 className='text-primary fw-bold'>Esplora</h1>
                    <p className='mt-4 fw-extralight text-muted'>Inizia a dare un'occhiata ai corsi offerti per essere pronto quando dovrai creare il tuo piano di studi.</p>
                </Col>
                <Col xs={{ span: 12 }}>
                    <Col xs={{ span: 12 }} className="mx-auto mb-5">
                        <div className='d-flex justify-content-between'>
                            <h3 className='fw-semibold text-primary'>Tutti i corsi offerti</h3>
                            <Button variant='link' size='sm' className='text-secondary text-decoration-none p-0'>Vedi tutte</Button>
                        </div>
                        <CoursesList courses={courses} />
                    </Col>
                </Col>
            </Row >
        );

    return (
        <div>
            loading...
        </div>
    )
}

export default Explore;