import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

import { api } from "../../services";
import { useNotification, useSession } from "../../hooks";

import { date } from "../../helpers";

const OptionModal = ({ show, onHide }) => {
    const [options, setOptions] = useState([]);
    const session = useSession();
    const notify = useNotification();

    useEffect(() => {
        api.plans.getStudyPlanOptions()
            .then(options => setOptions(options))
            .catch(err => notify.error(err));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const createStudyPlan = (type) => {
        const selectedOption = options.find(option => option.id === type);
        session.createLocalPlan({
            type: { id: type, name: selectedOption.name, min: selectedOption.min_credits, max: selectedOption.max_credits },
            totCredits: 0,
            courses: [],
            createDate: date.now(),
        });
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="text-primary fw-bold">Crea il tuo piano di studio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='text-primary my-4 mx-3 px-5'>Prima di continuare devi scegliere una delle seguenti opzioni per il tuo piano di studio</p>
                <div className='d-flex text-center my-5 px-5'>
                    {options.map((option, index) => {
                        return (
                            <Button key={index} variant="none" className="p-0" onClick={() => createStudyPlan(option.id)}>
                                <div className='modal-option text-primary d-flex flex-column align-items-center p-5 border border-2 rounded-3 mx-3'>
                                    <FontAwesomeIcon icon={option.id === 1 ? faCircle : faCircleHalfStroke} size={'3x'} className='text-primary mb-4' />
                                    <h4 className='fw-semibold mb-4'>{option.name}</h4>
                                    <small>Il totale dei crediti dei corsi di un piano di studio {option.name}
                                        deve essere compreso tra {option.min_credits} e {option.max_credits} crediti, estremi inclusi.</small>
                                </div>
                            </Button>
                        );
                    })}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default OptionModal;