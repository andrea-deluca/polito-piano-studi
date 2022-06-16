/*
 * ------------------------ CoursesList --------------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            CoursesList.jsx
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

import { Accordion } from "react-bootstrap";

import Course from './Course';

// ExpandableCourse component
// -- Not exported
const ExpandableCourse = ({ course, eventKey }) => {
    return (
        <Accordion.Item eventKey={eventKey} className="my-4 p-4 border-0 rounded-3">
            <Accordion.Header className='mb-4'>
                <Course.CourseHeader course={course} />
            </Accordion.Header>
            <Accordion.Body className='text-dark'>
                <Course.CourseBody course={course} />
            </Accordion.Body>
        </Accordion.Item>
    );
}

// CoursesList component
// -- Exported
const CoursesList = ({ courses }) => {
    if (courses.length === 0)
        return (
            <div className="mt-5">
                <h6 className="text-accent">Mi dispiace... Non c'è nessun corso qua...</h6>
            </div>
        );

    return (
        <Accordion alwaysOpen>
            {courses.map((course, index) => {
                return <ExpandableCourse key={index} eventKey={index} course={course} />
            })}
        </Accordion>
    );
}

export default CoursesList;