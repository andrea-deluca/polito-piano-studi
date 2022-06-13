/*
 * ------------------------ Input -------------------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            Input.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-08
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

// Form client validation and validation error handler
import { Field, ErrorMessage, useField } from "formik";

// Client UI/UX
import { Form } from "react-bootstrap";
import classNames from "classnames";

// Input component
// -- Exported
const Input = ({ id, name, type, placeholder, className, label }) => {
    const [field, meta] = useField(name);

    // Dynamic classes
    const classes = classNames({
        'form-control text-dark bg-gray rounded-3 p-3': true,
        'border-0': !meta.touched, // Border enabled, if field is touched
        'is-invalid': meta.touched && meta.error, // Invalid field style, if touched and validation errors
        'is-valid': meta.touched && !meta.error // Valid field, if touched and no validation errors
    })

    return (
        <Form.Group className={className} controlId={id}>
            <Form.Label className="fw-semibold text-primary" >{label}</Form.Label>
            <Field id={id} name={field.name} type={type} placeholder={placeholder} className={classes} />
            <Form.Text className='text-danger'>
                <ErrorMessage name={field.name} />
            </Form.Text>
        </Form.Group>
    );
}

export default Input;