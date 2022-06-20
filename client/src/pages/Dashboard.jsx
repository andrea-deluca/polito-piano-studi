/*
 * ------------------------ Dashboard ---------------------------------
 * 
 * Package:         client
 * Module:          pages
 * File:            Dashboard.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21  
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'react-bootstrap';

import { useSession } from '../hooks';

import { UI } from '../components';

// Dashboard page
// -- Exported
const Dashboard = () => {
    const session = useSession(); // Session handler

    return (
        <Row>
            <div className='mb-5'>
                <h3 className='text-primary fw-bold'>{`Welcome back, ${session.user.firstname}`}</h3>
            </div>

            <Alert variant={session.plan ? (session.plan.id ? 'success' : 'warning') : 'danger'} className='mb-5 border-2 rounded-3'>
                <h6 className='m-0'>
                    {session.plan ?
                        (session.plan.id ?
                            "Piano di studio salvato correttamente." :
                            "Attenzione! Il tuo piano di studio risulta incompleto. Se non completi correttamente il tuo piano di studio perderai tutte le modifiche apportate") :
                        "Non hai nessun piano di studio..."}
                </h6>
            </Alert>

            <Col xs={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} className='mb-5 mb-xl-0'>
                <UI.AnimatedCard to='/study-plan' title={"Visualizza il tuo piano di studio"} footer={"Visualizza, modifica oppure elimina"} height={300} disabled={!session.plan}>
                    Puoi visuliazzare il piano di studio che hai creato, apportare delle modifiche oppure
                    eliminare permanentemente il piano di studio per crearne uno nuovo.
                </UI.AnimatedCard>
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} className='mb-5 mb-xl-0'>
                <Link to='/esplora' className='text-decoration-none'>
                    <UI.AnimatedCard title={"Vai ad Esplora"} footer={"Vai a Esplora per la lista completa dei corsi"} height={300}>
                        Vai ad Esplora per dare un'occhiata alla lista completa dei corsi offerti ed essere pronto a creare il tuo piano di studi.
                    </UI.AnimatedCard>
                </Link>
            </Col>
        </Row>
    );
}

export default Dashboard;