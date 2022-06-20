/*
 * ------------------------ Plan ---------------------------------------
 * 
 * Package:         client
 * Module:          pages
 * File:            Plan.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import { api } from "../services";
import { useConfirm, useNotification, useSession } from "../hooks";
import { date } from "../helpers";

import { UI } from "../components";

// Plan page
// -- Exported
const Plan = () => {
    const [courses, setCourses] = useState([]); // State to store all courses
    const [loading, setLoading] = useState(false); // Set while waitting for server response
    const notify = useNotification(); // Notification handler
    const session = useSession(); // Session handler

    // On confirm, deletes the study plan associated with the logged in user
    const [modal, setModal] = useConfirm(() => { // Confirmation handler
        setLoading(true);
        // If a study plan associated with the logged in user exists into the db, 
        // so if the server found and sent back an id for it, perfoms API call 
        if (session.plan.id)
            api.plans.deleteStudyPlan(session.plan.id)
                .then(() => {
                    notify.success("Piano di studio eliminato correttamente");
                    session.updatePlanInfo();
                })
                .catch(err => notify.error(err))
                .finally(() => setLoading(false));
        // Else, deletes the local study plan from the client session,
        // without saving it into the db
        else {
            session.deleteLocalPlan();
            setLoading(false);
            notify.success("Piano di studio eliminato correttamente");
        }
    });

    // Gets all courses
    useEffect(() => {
        api.courses.retrieveAll()
            .then(courses => setCourses(courses))
    }, [])

    if (session.plan)
        return (
            <Row>
                <UI.ConfirmationModal show={modal} onHide={setModal.onHide} onConfirm={setModal.onConfirm} loading={loading} />
                <div className="d-md-flex justify-content-between align-items-start mb-5">
                    <div className='text-primary'>
                        <h3 className='fw-bold'>Il mio piano di studio</h3>
                        <small>Piano di studio creato il {date.format(session.plan.createDate)}</small>
                        <small className="d-block">
                            {session.plan.updateDate ? `Ultimo modifica apportata il ${date.format(session.plan.updateDate)}` : "Nessuna modifica apportata dalla creazione"}
                        </small>
                    </div>
                    <div>
                        <Link to='/study-plan/edit' className="text-decoration-none px-4">
                            <FontAwesomeIcon icon={faPencil} className='me-3' />
                            <span>Modifica</span>
                        </Link>
                        <Button variant="outline-secondary" className="rounded-3 px-4 ms-3" onClick={setModal.onShow}>
                            <FontAwesomeIcon icon={faTrash} className='me-3' />
                            <span>Elimina</span>
                        </Button>
                    </div>
                </div>
                <div className="mb-4 text-primary">
                    <div className="mb-4">
                        <h6 className=''>Tipologia del piano di studio</h6>
                        <h6 className='fw-bold'>{session.plan.type.name}</h6>
                    </div>
                    <div>
                        <h6 className=''>Numero di crediti del piano di studio</h6>
                        <h6 className='fw-bold'>{session.plan.totCredits} CFU</h6>
                    </div>
                </div>
                <UI.CoursesList expandable courses={courses.filter(course => session.plan.courses.includes(course.code))} />
            </Row>
        );
    else return (
        <div className='text-primary d-flex align-items-center justify-content-center py-5'>
            <FontAwesomeIcon icon={faFileCircleQuestion} size='5x' className="me-4" />
            <div className="lh-1">
                <h3 className='fw-bold'>Mi dispiace... non hai nessun piano di studio</h3>
                <small>Una volta creato un piano di studio potrai visualizzarlo in questa pagina.</small>
            </div>
        </div>
    );
}

export default Plan;