import { faRocket, faBook, faGraduationCap, faUserAstronaut, faGear } from '@fortawesome/free-solid-svg-icons';

const sidebarItems = [
    {
        section: 'Core', links: [
            { label: 'Dashboard', url: '/dashboard', icon: faRocket },
            { label: 'Il mio piano di studio', url: '/plan', icon: faGraduationCap },
            { label: 'Esplora', url: '/explore', icon: faBook },
        ]
    },
    {
        section: 'User', links: [
            { label: 'Account', url: '/account', icon: faUserAstronaut },
            { label: 'Settings', url: '/settings', icon: faGear },
        ]
    },
];

export default sidebarItems;