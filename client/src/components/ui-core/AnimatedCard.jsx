/*
 * ------------------------ AnimatedCard ------------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            AnimatedCard.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-14
 * 
 * Used in:         pages/Dashboard
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

// Wrapper to manage AnimatedCard functionality
// -- Not exported
const Wrapper = ({ link, disabled, children }) => {
    return (
        <div className='d-flex'>
            {(link && !disabled) ?
                <Link to={link} className="text-decoration-none">
                    {children}
                </Link> :
                children
            }
        </div>

    )
}

// AnimatedCard component
// -- Exported
const AnimatedCard = ({ title, footer, height, disabled, to, children }) => {

    // Dynamic classes
    const cardClass = classNames({
        'bg-gray text-primary border-0 w-100': true,
        'opacity-50': disabled, // Animation disabled and opacity enabled
        'animated-card': !disabled, // Animation enabled
    })

    return (
        <Wrapper link={to} disabled={disabled}>
            <Card className={cardClass} style={{ height: height }}>
                <div className='animated-card-icon-container'>
                    <FontAwesomeIcon icon={faArrowRight} size='xs' className='animated-card-icon' />
                </div>
                <Card.Body className='d-flex flex-column justify-content-between'>
                    <Card.Title className='fs-3'>{title}</Card.Title>
                    <Card.Text className='fw-light small'>
                        {children}
                    </Card.Text>
                    <Card.Text className='small fw-medium'>{footer}</Card.Text>
                </Card.Body>
            </Card>
        </Wrapper>
    );
}

export default AnimatedCard;