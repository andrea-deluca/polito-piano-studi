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

import { Row, Col } from 'react-bootstrap';

import { useSession } from '../hooks';

import { UI } from '../components';

// Dashboard page
// -- Exported
const Dashboard = () => {
    const session = useSession(); // Session handler

    return (
        <Row>
            <div className='mb-5'>
                <h3 className='text-primary fw-bold'>{`Bentornato, ${session.user.firstname}`} &#128075;</h3>
            </div>
            <UI.PlanStatusAlert />
            <Col xs={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} className='mb-5 mb-xl-0'>
                <UI.AnimatedCard to='/study-plan' title={"Visualizza il tuo piano di studio"} footer={"Visualizza il tuo piano di studio"} height={300} disabled={!session.plan}>
                    Puoi visuliazzare il piano di studio che hai creato, apportare delle modifiche oppure
                    eliminare permanentemente il tuoi piano di studio.
                </UI.AnimatedCard>
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }} className='mb-5 mb-xl-0'>
                <Link to='/explore' className='text-decoration-none'>
                    <UI.AnimatedCard title={"Vai ad Esplora"} footer={"Visualizza la lista completa dei corsi"} height={300}>
                        Vai ad Esplora per visualizzare la lista completa dei corsi offerti e per prepararti a creare il tuo piano di studio.
                    </UI.AnimatedCard>
                </Link>
            </Col>
        </Row>
    );
}

export default Dashboard;