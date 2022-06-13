import { Row, Col } from 'react-bootstrap';

import { Forms } from '../components';

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