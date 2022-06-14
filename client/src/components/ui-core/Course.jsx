/*
 * ------------------------ Course ------------------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            Course.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-15
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// CourseHeader component
const CourseHeader = ({ course }) => {
    return (
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
    );
}

// CourseBody component
const CourseBody = ({ course }) => {
    return (
        <div className="d-flex flex-column">
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
                </ul> : <small className='text-accent'>Nessun corso incompatibile</small>
            }
        </div>
    );
}

// Course object that contains course Header and Body
const Course = { CourseHeader, CourseBody };

export default Course; 