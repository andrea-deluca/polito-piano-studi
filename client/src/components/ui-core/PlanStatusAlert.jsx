/*
 * ------------------------ PlanStatusAlert ---------------------------
 * 
 * Package:         client
 * Module:          components/ui-core
 * File:            PlanStatusAlert.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21  
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */


import { Alert } from "react-bootstrap";

import { useSession } from "../../hooks";

// PlanStatusAlert component
// -- Exported
const PlanStatusAlert = () => {
    const session = useSession(); // Session handler

    return (
        <Alert variant={session.plan ? (session.plan.id ? 'success' : 'warning') : 'danger'} className='mb-5 border-2 rounded-3'>
            <h6 className='m-0'>
                {session.plan ?
                    (session.plan.id ?
                        "Il tuo piano di studio è stato salvato correttamente." :
                        "Attenzione! Il tuo piano di studio risulta incompleto. Se non completi il tuo piano di studio, esso non verrà salvato e perderai ogni modifica apportata.") :
                    "Nessun piano di studio trovato. Procedi con la creazione del tuo piano di studio."}
            </h6>
        </Alert>
    );
}

export default PlanStatusAlert;