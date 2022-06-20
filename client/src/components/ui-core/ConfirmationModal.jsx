/*
 * ------------------------ ConfirmationModal -------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            ConfirmationModal.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { Modal, Button, Spinner } from "react-bootstrap";

// ConfirmationModal component
// -- Exported
const ConfirmationModal = ({ show, onHide, onConfirm, loading }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header className="border-0">
                <Modal.Title className="fw-bold text-primary lh-sm">
                    Sei sicuro di voler eliminare il tuo piano di studio?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="small text-dark">
                <div className="mb-5">
                    Confermando la tua scelta, il tuo piano di studio sarà cancellato in maniera
                    irreversibile e non potrà essere più recuperato.
                </div>
                <h6 className="fw-bold m-0">
                    Sei sicuro di procedere?
                </h6>
                <span className="fw-bold text-secondary">Per favore conferma la tua scelta.</span>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="light" onClick={onHide} className='fw-bold rounded-3'>
                    <span className="opacity-50">Annulla</span>
                </Button>
                <Button variant="secondary" onClick={onConfirm} className='fw-bold rounded-3'>
                    {loading && <Spinner animation='border' size='sm' as='span' role='status' aria-hidden='true' className='me-2' />}
                    <span className="text-light">Conferma</span>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;