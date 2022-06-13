import { useState } from "react";

import { Button, Spinner } from "react-bootstrap";

import { Formik, Form } from "formik";
import { VerificationCodeSchema } from "../../validations";

import { api } from "../../services";
import { useNotification, useSession } from "../../hooks";

import { Input } from "../ui-core";

const VerificationCodeForm = ({ variant, next, email }) => {
    const session = useSession();
    const notify = useNotification();
    const [loading, setLoading] = useState(false);

    const sendVerificationCode = () => {
        const notification = notify.promise.loading("Sending...")
        api.sessions.sendVerificationCode({ email: email })
            .then(() => notify.promise.success(notification, "Sent"))
            .catch(err => notify.promise.error(notification, err))
    }

    const handleSubmit = (values) => {
        setLoading(true);
        console.log(email)
        api.sessions.verifyEmail({ ...values, email: email })
            .then(() => {
                if (variant === 'modal') {
                    notify.success({ message: "Verified" })
                    session.updateInfo();
                } next();
            })
            .catch(err => notify.error(err))
            .finally(() => setLoading(false))
    }

    return (
        <Formik validateOnMount initialValues={{ verificationCode: '' }} validationSchema={VerificationCodeSchema} onSubmit={values => handleSubmit(values)}>
            {({ touched, isValid }) => {
                const disableSubmit = !touched.verificationCode || !isValid || loading;
                return (
                    <Form className={variant === 'modal' ? "px-3 mt-5" : ""}>
                        <h5 className="fw-light text-dark mb-4 text-center">
                            Prima di poter utilizzare l'applicazione devi procedere con la verifica della email con cui ti sei registrato
                            e con l'attivazione del tuo account.
                        </h5>
                        <h5 className="fw-light text-dark mb-5 text-center">
                            Controlla la tua casella di posta elettronica e inserisci il codice per verificare la tua email e completare la registrazione.
                        </h5>
                        <Input type='text' id='signup-verification-code' label={'Codice segreto'} name='verificationCode' placeholder={'Inserisci il codice segreto'} />
                        <Button variant="link" className="p-0 mb-5 mt-3 text-dark opacity-50" onClick={sendVerificationCode}>
                            Invia di nuovo un codice di verifica
                        </Button>
                        <div className="d-flex flex-column w-100 align-items-end">
                            <div className="mb-5">
                                {variant === 'view' && <Button variant="gray" className="rounded-3 p-3 px-5 me-3" onClick={() => next()}>
                                    Non ora
                                </Button>}
                                <Button variant="secondary" type='submit' className="rounded-3 p-3 px-5" disabled={disableSubmit}>
                                    {loading && <Spinner animation='grow' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                                    Continua
                                </Button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default VerificationCodeForm;