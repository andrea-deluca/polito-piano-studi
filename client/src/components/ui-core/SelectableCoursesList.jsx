/*
 * ------------------------ SelectableCoursesList ----------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            SelectableCoursesList.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { useState, useEffect } from "react";

import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import { api } from "../../services";
import { useNotification } from "../../hooks";

import Course from "./Course";

// SelectableCourse component
// -- Not exported
const SelectableCourse = ({ course, disabled, select, onClick }) => {

    // Dynamic classes
    const itemClass = classNames({
        'my-2 p-4': true,
        'border-2 border-success': select, // Selected course
        'border-2 border-gray': !select, // Unselected course
        'opacity-50': disabled // Disabled course
    })

    return (
        <ListGroup.Item action className={itemClass} onClick={onClick}>
            <div className="d-flex justify-content-between align-items-center mx-5">
                <div>
                    <Course.CourseHeader course={course} />
                    <div className="mt-4">
                        <Course.CourseBody course={course} />
                    </div>
                </div>
                <FontAwesomeIcon icon={faCircleCheck} size="2x" className={select ? 'text-success' : 'text-gray'} />
            </div>
        </ListGroup.Item>
    );
}

// SelectableCoursesList component
// -- Exported
const SelectableCoursesList = ({ planCourses, actions }) => {
    const [courses, setCourses] = useState([]); // All courses
    const notify = useNotification();

    // API call to the server to load from the db all the courses
    useEffect(() => {
        api.courses.retrieveAll()
            .then((courses) => setCourses(courses))
            .catch(err => notify.error(err));
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    // Delesects a course from the list of courses in the study plan
    const deselectItem = (deselectedCourse) => {
        // Finds a course that has the course that has to been removed as preparatory course, if exists
        const preparatoryCourse = courses.find(course => course.preparatoryCourse && course.preparatoryCourse.code === deselectedCourse.code);
        if (preparatoryCourse && planCourses.includes(preparatoryCourse.code)) {
            // If exists a course that has it as preparatory course, removes both of them and runs a warning notification to the user
            notify.error(`Il corso selezionato non può essere rimosso in quanto propedeutico per il corso ${preparatoryCourse.code} ${preparatoryCourse.name}`);
        } else {
            // Else, removes just the course that has to been removed
            actions.setPlanCourses((old) => old.filter(planCourse => planCourse !== deselectedCourse.code))
            actions.setCredits(old => old - deselectedCourse.credits);
        }
    }

    // Checks if the selected course may be put into the study plan and, in case, selects it
    const selectItem = (course) => {
        // Checks for preparatory course
        if (course.preparatoryCourse && !planCourses.includes(course.preparatoryCourse.code))
            notify.error("Il corso selezionato ha un corso propedeutico. Seleziona prima il corso propedeutico.");
        // Checks for incompatible course
        else if (course.incompatibleCourses && course.incompatibleCourses.find(incompatibleCourse => planCourses.includes(incompatibleCourse.code)))
            notify.error("Il corso selezionato non è compatabile con uno o più corsi già nel piano di studio");
        // Checks for maximum number of enrolled students
        else if (course.maxStudents && course.maxStudents === course.enrolledStudents)
            notify.error("Il corso selezionato ha raggiunto il numero massimo di iscritti");
        // If the selected course passes all the checks, adds it into the study plan and selects it
        else {
            actions.setPlanCourses((old) => [...old, course.code]);
            actions.setCredits(old => old + course.credits)
        }
    }

    return (
        <>
            <div>
                <ListGroup className="mt-5">
                    {courses.filter(course => planCourses.includes(course.code)).map((planCourse, index) => {
                        return <SelectableCourse key={index} course={planCourse} select
                            onClick={() => deselectItem(planCourse)} />
                    })}
                    {courses.filter(course => !planCourses.includes(course.code)).map((course, index) => {
                        const errors = {
                            preparatoryCourse: course.preparatoryCourse && !planCourses.includes(course.preparatoryCourse.code),
                            incompatibleCourse: course.incompatibleCourses && course.incompatibleCourses.find(incompatibleCourse => planCourses.includes(incompatibleCourse.code)),
                            limitMaxStudents: course.maxStudents && course.maxStudents === course.enrolledStudents
                        }
                        return <SelectableCourse key={index} course={course} select={false}
                            onClick={() => selectItem(course)}
                            disabled={errors.incompatibleCourse || errors.preparatoryCourse || errors.limitMaxStudents} />
                    })}
                </ListGroup>
            </div>
        </>
    );
}

export default SelectableCoursesList;