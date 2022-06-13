import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';

import { api } from '../../services';
import { useSession } from '../../hooks';

import { sidebarItems } from '../../constants';

import AppBrand from './AppBrand';
import OptionModal from './OptionModal';
import UserBadge from './UserBadge';

const Sidebar = ({ show }) => {
    const session = useSession();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

    const handleLogout = () => {
        api.sessions.logout()
            .then(() => {
                session.logout();
            })
    }

    const handleSidebarButton = () => {
        if (!session.plan) setModal(true);
        else navigate('/plan/edit', { replace: true });
    }

    const sidebarClass = classNames({
        'sidebar mx-auto d-none d-xxl-flex flex-column px-5 bg-light': true,
        'sidebar-close': !show,
    })

    return (
        <Col xs={{ span: 3 }} className={sidebarClass}>
            <AppBrand link='/dashboard' />
            <UserBadge />
            
            {!session.plan && <OptionModal show={modal} onHide={() => setModal(false)} />}

            <Button variant='outline-secondary' onClick={handleSidebarButton}>
                <FontAwesomeIcon icon={faFolder} className='me-2' />
                <span className='small'>
                    {!session.plan ? "Crea il tuo piano di studi" : "Modifica il tuo piano di studio"}
                </span>
            </Button>

            <div>
                {sidebarItems.map((section, index) => {
                    return (
                        <div key={index}>
                            <h6 className='small text-primary mt-5 opacity-50 px-3'>{section.section}</h6>
                            {section.links.map((link, index) => {
                                return (
                                    <NavLink key={index} to={link.url}
                                        className={({ isActive }) => isActive ?
                                            'bg-gray d-flex align-items-center text-decoration-none my-4 p-3 rounded-3' :
                                            'sidebar-navlink d-flex align-items-center text-decoration-none my-4 px-3 rounded-3'}>
                                        <FontAwesomeIcon icon={link.icon} className='text-primary opacity-50 me-4' />
                                        <small className='fw-medium text-primary'>{link.label}</small>
                                    </NavLink>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <div className='mt-4'>
                <Button variant='outline-secondary' className='d-flex align-items-center border-0 rounded-3 p-3 w-100' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='opacity-50 me-4' />
                    <small>Logout</small>
                </Button>
            </div>
        </Col >
    );
}

export default Sidebar;