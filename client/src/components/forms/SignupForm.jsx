/*
 * ------------------------ SignupForm --------------------------------
 * 
 * Package:         client
 * Module:          components/forms
 * File:            SignupForm.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-14
 * 
 * Used in:         pages/Signup
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useState } from "react";

import { Row, Col, Button, Spinner } from "react-bootstrap";

import { Formik, Form } from "formik";

import { SignupSchema } from "../../validations";
import { api } from "../../services";
import { useNotification } from "../../hooks";

import { Input } from '../ui-core';

// SignupForm component
// -- Exported
const SignupForm = ({ next, data }) => {
    const [loading, setLoading] = useState(false); // Set while performing api call
    const notify = useNotification(); // Notification handler

    // Perform signup
    const handleSubmit = (user) => {
        setLoading(true);
        api.sessions.signup(user)
            .then((user) => {
                data.put(user);
                next();
            })
            .catch(err => notify.error(err))
            .finally(() => setLoading(false))
    }

    return (
        <Formik validateOnMount initialValues={{ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={values => handleSubmit(values)}>
            {({ touched, isValid }) => {
                const disableSubmit = (!touched.firstname && !touched.lastname && !touched.email && !touched.password && !touched.confirmPassword) || !isValid || loading;
                return (
                    <Form>
                        <Row className="mb-5">
                            <Col xs={{ span: 12 }} md={{ span: 6 }} className='mb-5 mb-md-0'>
                                <Input type='text' id='signup-firstname' label={'Nome'} name='firstname' placeholder={'Inserisci il tuo nome'} />
                            </Col>
                            <Col xs={{ span: 12 }} md={{ span: 6 }}>
                                <Input type='text' id='signup-lastname' label={'Cognome'} name='lastname' placeholder={'Inserisci il tuo cognome'} />
                            </Col>
                        </Row>
                        <Input type='email' id='signup-email' label={'Email'} name='email' placeholder={'Inserisci il tuo indirizzo email'} className='mb-5' />
                        <Input type='password' id='signup-password' label={'Password'} name='password' placeholder={'Inserisci la tua password'} className='mb-5' />
                        <Input type='password' id='signup-confirm-password' label={'Conferma password'} name='confirmPassword' placeholder={'Conferma la tua password'} className='mb-5' />
                        <div className="d-flex flex-column w-100 align-items-end">
                            <Button variant="secondary" type="submit" className="rounded-3 mb-5 p-3 px-5" disabled={disableSubmit}>
                                {loading && <Spinner animation='grow' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                                Continua
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default SignupForm;