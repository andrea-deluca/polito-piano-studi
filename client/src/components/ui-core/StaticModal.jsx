/*
 * ------------------------ StaticModal -------------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            StaticModal.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-14
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { Modal } from "react-bootstrap";

// StaticModal component
// -- Exported
const StaticModal = ({ show, title, children }) => {
    return (
        <Modal show={show} centered size="lg" backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title className="text-primary fw-bold">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default StaticModal;