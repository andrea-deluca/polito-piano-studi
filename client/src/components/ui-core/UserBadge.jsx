import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import { useSession } from "../../hooks";

const UserBadge = () => {
    const session = useSession();

    return (
        <div className="d-none d-xl-flex text-start rounded-3 align-items-center py-3 rounded-3 my-5">
            <FontAwesomeIcon icon={faCircleUser} size={'2x'} className='me-3 text-primary' />
            <div className="d-flex flex-column">
                <h6 className="fw-bold text-primary m-0 me-2">{session.user.firstname + " " + session.user.lastname}</h6>
                <small className="fw-light text-primary opacity-50">{session.user.email}</small>
            </div>
        </div>
    );
}

export default UserBadge;