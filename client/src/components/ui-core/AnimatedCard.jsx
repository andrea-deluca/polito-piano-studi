/*
 * ------------------------ AnimatedCard ------------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            AnimatedCard.jsx
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

// Client routes navigation
import { Link } from 'react-router-dom';

// Client UI/UX
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
const AnimatedCard = ({ category, title, footer, height, disabled, to, children }) => {

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
                    <div>
                        <Card.Text className='lh-1 mb-2 fw-medium opacity-50 small'>{category}</Card.Text>
                        <Card.Title className='fs-3'>{title}</Card.Title>
                    </div>
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