import { Modal } from "react-bootstrap";

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