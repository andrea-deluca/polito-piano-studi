import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleQuestion, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
    return (
        <Row className="align-items-center h-100">
            <Col xs={{ span: 12 }} xl={{ span: 10 }} className='d-flex flex-column align-items-center mx-auto'>
                <div className="d-flex flex-column align-items-start">
                    <FontAwesomeIcon icon={faFileCircleQuestion} size={"6x"} className="text-primary mb-5" />
                    <h4 className="text-primary opacity-25 fw-bold m-0">404 Page Not Found</h4>
                    <h1 className="text-primary fw-bold">Ops... something went wrong</h1>
                    <small className="d-block text-primary opacity-50 mt-4">Sorry but the requested page does not exist...</small>
                    <Link to={"/"} replace className="mt-5">
                        <Button variant="gray" className="rounded-3">
                            <FontAwesomeIcon icon={faAngleLeft} className="me-3" />
                            Back to home
                        </Button>
                    </Link>
                </div>
            </Col>
        </Row>
    );
}

export default NotFound;