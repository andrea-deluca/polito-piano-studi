import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames";

import { api } from "../services";
import { useNotification, useSession } from "../hooks";

import { date } from "../helpers";

const SelectedCourse = ({ course, onClick }) => {
    return (
        <ListGroup.Item action className="border-2 border-success my-2 p-4" onClick={onClick}>
            <div className="d-flex justify-content-between align-items-center mx-5">
                <div className='d-flex flex-column text-dark'>
                    <h6 className='text-primary opacity-50'>{course.code}</h6>
                    <h5>{course.name}</h5>
                    <h6 className='mt-1'>{course.credits} CFU</h6>
                    <small className='text-accent mt-3'>
                        {course.max_students ? `Massimo ${course.max_students} studenti` : "Nessun numero massimo di studenti"}
                    </small>
                    <small className='text-accent mt-1'>
                        {course.enrolled_students ? `${course.enrolled_students} studenti attualmente iscritti` : "Nessuno studente attualmente iscritto"}
                    </small>
                    <div className="mt-4">
                        <h6 className='mt-3'>Corsi propedeutici</h6>
                        {course.preparatoryCourse ?
                            <ul>
                                <li>
                                    <span className='me-2'>{course.preparatoryCourse.code}</span>
                                    <span>{course.preparatoryCourse.name}</span>
                                </li>
                            </ul> : <small className='text-accent'>Nessun corso propedeutico</small>
                        }

                        <h6 className='mt-3'>Corsi incompatibili</h6>
                        {course.incompatibleCourses ?
                            <ul>
                                {course.incompatibleCourses.map((incompatibleCourse, index) => {
                                    return (
                                        <li key={index} className="b-2">
                                            <span className='me-1'>{incompatibleCourse.code}</span>
                                            <span>{incompatibleCourse.name}</span>
                                        </li>
                                    );
                                })}
                            </ul> : <small className='text-accent'>Nessun corso incompatibile</small>}
                    </div>
                </div>
                <FontAwesomeIcon icon={faCircleCheck} size="2x" className="text-success" />
            </div>
        </ListGroup.Item>
    );
}

const Course = ({ course, onClick, disabled }) => {
    const itemClass = classNames({
        'border-2 border-gray my-2 p-4': true,
        'opacity-50': disabled
    })

    return (
        <ListGroup.Item action className={itemClass} onClick={onClick}>
            <div className="d-flex justify-content-between align-items-center mx-5">
                <div className='d-flex flex-column text-dark w-100'>
                    <h6 className='text-primary opacity-50'>{course.code}</h6>
                    <h5 >{course.name}</h5>
                    <h6 className='mt-1'>{course.credits} CFU</h6>
                    <small className='text-accent mt-3'>
                        {course.maxStudents ? `Massimo ${course.maxStudents} studenti` : "Nessun numero massimo di studenti"}
                    </small>
                    <small className='text-accent mt-1'>
                        {course.enrolledStudents ? `${course.enrolledStudents} studenti attualmente iscritti` : "Nessuno studente attualmente iscritto"}
                    </small>
                    <div className="mt-4">
                        <h6 className='mt-3'>Corsi propedeutici</h6>
                        {course.preparatoryCourse ?
                            <ul>
                                <li>
                                    <span className='me-2'>{course.preparatoryCourse.code}</span>
                                    <span>{course.preparatoryCourse.name}</span>
                                </li>
                            </ul> : <small className='text-accent'>Nessun corso propedeutico</small>
                        }

                        <h6 className='mt-3'>Corsi incompatibili</h6>
                        {course.incompatibleCourses ?
                            <ul>
                                {course.incompatibleCourses.map((incompatibleCourse, index) => {
                                    return (
                                        <li key={index} className="b-2">
                                            <span className='me-1'>{incompatibleCourse.code}</span>
                                            <span>{incompatibleCourse.name}</span>
                                        </li>
                                    );
                                })}
                            </ul> : <small className='text-accent'>Nessun corso incompatibile</small>}
                    </div>
                </div>
                <FontAwesomeIcon icon={faCircleCheck} size="2x" className="text-gray" />
            </div>
        </ListGroup.Item>
    );
}

const SelectionList = () => {
    const session = useSession();
    const notify = useNotification();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [credits, setCredits] = useState(session.plan.totCredits);
    const [planCourses, setPlanCourses] = useState(session.plan.courses);

    useEffect(() => {
        api.courses.retrieveAll()
            .then((courses) => setCourses(courses))
            .catch(err => notify.error(err));
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const deselectItem = (deselectedCourse) => {
        const preparatoryCourse = courses.find(course => course.preparatoryCourse && course.preparatoryCourse.code === deselectedCourse.code);

        if (preparatoryCourse && planCourses.includes(preparatoryCourse.code)) {
            setPlanCourses((old) => old.filter(planCourse => planCourse !== preparatoryCourse.code))
            setCredits(old => old - preparatoryCourse.credits);
            notify.warning(`Per ragioni di propedeucità è stato rimosso anche il corso ${preparatoryCourse.code} ${preparatoryCourse.name}`);
        }

        setPlanCourses((old) => old.filter(planCourse => planCourse !== deselectedCourse.code))
        setCredits(old => old - deselectedCourse.credits);
    }

    const selectItem = (course) => {
        if (course.preparatoryCourse && !planCourses.includes(course.preparatoryCourse.code))
            notify.error("Il corso selezionato ha un corso propedeutico. Seleziona prima il corso propedeutico.");
        else if (course.incompatibleCourses && course.incompatibleCourses.find(incompatibleCourse => planCourses.includes(incompatibleCourse.code)))
            notify.error("Il corso selezionato non è compatabile con uno o più corsi già nel piano di studio");
        else if (course.maxStudents && course.maxStudents === course.enrolledStudents)
            notify.error("Il corso selezionato ha raggiunto il numero massimo di iscritti");
        else {
            setPlanCourses((old) => [...old, course.code]);
            setCredits(old => old + course.credits)
        }
    }

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
            <div>
                <ListGroup className="mt-5">
                    {courses.filter(course => planCourses.includes(course.code)).map((planCourse, index) => {
                        return <SelectedCourse key={index} course={planCourse} onClick={() => deselectItem(planCourse)} />
                    })}
                    {courses.filter(course => !planCourses.includes(course.code)).map((course, index) => {
                        const errors = {
                            preparatoryCourse: course.preparatoryCourse && !planCourses.includes(course.preparatoryCourse.code),
                            incompatibleCourse: course.incompatibleCourses && course.incompatibleCourses.find(incompatibleCourse => planCourses.includes(incompatibleCourse.code)),
                            limitMaxStudents: course.maxStudents && course.maxStudents === course.enrolledStudents
                        }
                        return <Course key={index} course={course} onClick={() => selectItem(course)} disabled={errors.incompatibleCourse || errors.preparatoryCourse || errors.limitMaxStudents} />
                    })}
                </ListGroup>
            </div>
        </>
    );
}

const EditPlan = () => {
    const session = useSession();

    if (session.plan) return <SelectionList />
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