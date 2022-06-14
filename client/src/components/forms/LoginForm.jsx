/*
 * ------------------------ LoginForm ---------------------------------
 * 
 * Package:         client
 * Module:          components/forms
 * File:            LoginForm.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-14
 * 
 * Used in:         pages/Login
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Spinner } from 'react-bootstrap';

import { Formik, Form } from 'formik';

import { LoginSchema } from '../../validations';
import { api } from '../../services';
import { useNotification, useSession } from '../../hooks';

import { Input } from '../ui-core';

// LoginForm component
// -- Exported
const LoginForm = () => {
    const [loading, setLoading] = useState(false); // Set while perfoming api call
    const session = useSession(); // Session handler
    const notify = useNotification(); // Notification handler
    const navigate = useNavigate(); // Navigation handler

    // Perform authentication and login
    const handleSubmit = (credentials) => {
        setLoading(true);
        api.sessions.login(credentials)
            .then(user => {
                session.login();
                notify.success(`Bentornato, ${user.firstname}!`);
                navigate('/dashboard', { replace: true });
            })
            .catch(err => notify.error(err))
            .finally(() => setLoading(false))
    }

    return (
        <Formik validateOnMount initialValues={{ username: '', password: '' }} validationSchema={LoginSchema} onSubmit={(values) => handleSubmit(values)}>
            {({ touched, isValid }) => {
                const disableSubmit = (!touched.username && !touched.password) || !isValid || loading;
                return (
                    <Form>
                        <Input type='email' id='login-username' label='Email' name='username' placeholder={"Inserisci il tuo indirizzo email"} className={'mb-5'} />
                        <Input type='password' id='login-password' label='Password' name='password' placeholder={"Inserisci la tua password"} className={'mb-3'} />
                        <Link to="/password-recovery" className='link-primary fw-light'>
                            Ho dimenticato la password.
                        </Link>
                        <Button variant="secondary" type="submit" className='p-3 rounded-3 mt-5 mb-3 w-100' disabled={disableSubmit}>
                            {loading && <Spinner animation='grow' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                            Accedi
                        </Button>
                        <small className='text-primary fw-light'>Non sei registrato? </small>
                        <Link to='/signup' className='text-primary fw-light'>
                            Crea un account.
                        </Link>
                    </Form>
                );
            }}
        </Formik>
    );
}
export default LoginForm;