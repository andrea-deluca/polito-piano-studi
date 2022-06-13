import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Spinner } from 'react-bootstrap';

import { api } from '../../services';
import { useNotification, useSession } from '../../hooks';

import { Formik, Form } from 'formik';
import { LoginSchema } from '../../validations';

import { Input } from '../ui-core';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const session = useSession();
    const notify = useNotification();
    const navigate = useNavigate();

    const handleSubmit = (credentials) => {
        setLoading(true);
        api.sessions.login(credentials)
            .then(user => {
                notify.success(`Bentornato, ${user.firstname}! Chi sei?`);
                session.login();
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