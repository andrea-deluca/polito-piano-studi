import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import { api } from "../services";
import { useNotification, useSession } from "../hooks";

import { date } from "../helpers";

import { UI } from "../components";

const EditPlan = () => {
    const session = useSession();
    const notify = useNotification();
    const navigate = useNavigate();
    const [credits, setCredits] = useState(session.plan.totCredits);
    const [planCourses, setPlanCourses] = useState(session.plan.courses);

    const handleSubmit = () => {
        if (credits < session.plan.type.min)
            notify.error(`Un piano di studio ${session.plan.type.name} deve avere almeno ${session.plan.type.min} crediti`);
        else if (credits > session.plan.type.max)
            notify.error(`Un piano di studio ${session.plan.type.name} deve avere al più ${session.plan.type.max} crediti`);
        else if (session.plan.id) {
            const updates = {
                deletes: session.plan.courses.filter(oldCourse => !planCourses.includes(oldCourse)),
                inserts: planCourses.filter(newCourse => !session.plan.courses.includes(newCourse)),
            }
            api.plans.updateStudyPlan(session.plan.list, updates, credits, date.now())
                .then(() => {
                    notify.success("Piano di studio modificato correttamente");
                    session.updatePlanInfo();
                    navigate('/plan', { replace: true });
                })
                .catch(err => notify.error(err))
        } else
            api.plans.createStudyPlan(planCourses, { type: session.plan.type.id, credits: credits, createDate: session.plan.createDate, updateDate: date.now() })
                .then(() => {
                    notify.success("Piano di studio inserito correttamente");
                    session.updatePlanInfo();
                    navigate('/plan', { replace: true });
                })
                .catch(err => notify.error(err))
    }

    const reset = () => {
        setCredits(session.plan.totCredits);
        setPlanCourses(session.plan.courses);
    }

    if (session.plan)
        return (
            <>
                <div className="d-flex justify-content-between">
                    <h3 className='text-primary fw-bold mb-0'>Modifica piano di studio</h3>
                    <div>
                        <Button variant="gray" size="lg" className="rounded-3 px-5 me-4" onClick={reset}>
                            Reimposta
                        </Button>
                        <Button variant="primary" size="lg" className="rounded-3 px-5" onClick={handleSubmit}>
                            Salva
                        </Button>
                    </div>
                </div>
                <div className="mt-5">
                    <h6 className=''>Numero di crediti del piano di studio</h6>
                    <h6 className='fw-bold'>{credits} CFU</h6>
                </div>
                <UI.SelectableCoursesList planCourses={planCourses} actions={{ setPlanCourses, setCredits }} />
            </>
        )
    else return (
        <div className='text-primary d-flex align-items-center justify-content-center py-5'>
            <FontAwesomeIcon icon={faFileCircleQuestion} size='5x' className="me-4" />
            <div className="lh-1">
                <h3 className='fw-bold'>Mi dispiace... non hai nessun piano di studio</h3>
                <small>Una volta creato un piano di studio potrai modificarlo in questa pagina.</small>
            </div>
        </div>
    );
}

export default EditPlan;