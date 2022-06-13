import { Link } from 'react-router-dom'

import { Row, Col, Button } from "react-bootstrap";
import { AnimatePresence } from 'framer-motion';

import { signupSteps } from "../constants";
import { useStepper } from "../hooks";

import { Utils } from "../components";

import { Forms } from "../components";
import { UI } from "../components";

const SignupCompleted = () => {
    return (
        <div className="text-dark text-center mb-5">
            <h3 className="fw-light text-primary lh-1"><span className="fw-bold fs-1">Complimenti! &#127881;</span> Adesso è tutto pronto!</h3>
            <h3 className="fw-light">Vai alla pagina di login e accedi.</h3>
            <Link to='/login'>
                <Button variant='secondary' size="lg" className="rounded-3 p-3 px-5 mt-5">
                    Vai al login
                </Button>
            </Link>
        </div>
    );
}

const Signup = () => {
    const stepper = useStepper();

    const steps = [
        <Forms.SignupForm key={0} next={stepper.next} data={stepper.data} />,
        <Forms.VerificationCodeForm key={1} variant="view" next={stepper.next} email={stepper.context ? stepper.context.email : null} />,
        <SignupCompleted key={2} />
    ];

    return (
        <Row className='align-items-start flex-fill p-3 h-100'>
            <Col xs={{ span: 10 }} xl={{ span: 8 }} className="d-none d-lg-block mx-auto">
                <UI.Stepper steps={signupSteps} active={stepper.active} current={stepper.current} />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 10 }} xl={{ span: 6 }} className='mx-auto py-5'>
                <AnimatePresence exitBeforeEnter>
                    <Utils.ViewTransition key={stepper.active ? stepper.current + 1 : 0}>
                        {!stepper.active ?
                            <div>
                                <h1 className='text-primary fw-bold'>Signup</h1>
                                <p className='mt-4 fw-extralight text-muted'>
                                    Registrarsi è facile... ci vuole solo un attimo!
                                    Se completerai la registrazione, avrai la possbilità
                                    di accedere e creare i tuoi flow. Cosa aspetti?
                                </p>
                                <Button variant="secondary" size="lg" className="rounded-3 p-3 px-5 mt-5" onClick={() => stepper.start()}>
                                    Inizia ora
                                </Button>
                            </div> : steps.map((step, index) => {
                                if (stepper.current === index) return step;
                                return null;
                            })}
                    </Utils.ViewTransition>
                </AnimatePresence>
            </Col>
        </Row>
    );
}

export default Signup;