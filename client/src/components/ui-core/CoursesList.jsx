import { Accordion } from "react-bootstrap";

const CourseItem = ({ course, eventKey }) => {
    return (
        <Accordion.Item eventKey={eventKey} className="my-4 p-4 border-0 rounded-3">
            <Accordion.Header className='mb-4'>
                <div className='d-flex flex-column text-dark'>
                    <h6 className='text-primary opacity-50'>{course.code}</h6>
                    <h5 >{course.name}</h5>
                    <h6 className='mt-1'>{course.credits} CFU</h6>
                    <small className='text-accent mt-3'>
                        {course.maxStudents ? `Massimo ${course.maxStudents} studenti` : "Nessun numero massimo di studenti"}
                    </small>
                    <small className='text-accent mt-1'>
                        {course.enrolledStudents ? `${course.enrolledStudents} studenti attualmente iscritti` : "Nessuno studente attualmente iscritto"}
                    </small>
                </div>
            </Accordion.Header>
            <Accordion.Body className='text-dark'>
                <div className='mb-5'>
                    <h6 className='mt-3'>Corsi propedeutici</h6>
                    {course.preparatoryCourse ?
                        <ul>
                            <li>
                                <span className='me-2'>{course.preparatoryCourse.code}</span>
                                <span>{course.preparatoryCourse.name}</span>
                            </li>
                        </ul> : <small className='text-accent'>Nessun corso propedeutico</small>
                    }
                </div>
                <div className='mb-4'>
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
            </Accordion.Body>
        </Accordion.Item>
    );
}

const CoursesList = ({ courses }) => {

    if (courses.length === 0)
        return (
            <div className="mt-5">
                <h6 className="text-accent">Mi dispiace... Non c'è nessun corso qua...</h6>
            </div>
        );

    return (
        <Accordion alwaysOpen className='my-5'>
            {courses.map((course, index) => {
                return <CourseItem key={index} eventKey={index} course={course} />
            })}
        </Accordion>
    );
}

export default CoursesList;