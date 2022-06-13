import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames";

const Step = ({ disabled, label, description, index }) => {
    const stepIcons = [fa1, fa2, fa3];

    const iconClass = classNames({
        'p-3 me-3 bg-gray rounded-circle': true,
        'text-primary': !disabled,
        'text-dark opacity-25': disabled
    })

    const h3Class = classNames({
        'fw-bold lh-1': true,
        'text-primary': !disabled,
        'text-dark opacity-25': disabled
    })

    const pClass = classNames({
        'fw-light lh-sm': true,
        'text-secondary': !disabled,
        'text-dark opacity-25': disabled
    })

    return (
        <div className="d-flex">
            <FontAwesomeIcon icon={stepIcons[index]} className={iconClass}
                style={{ width: '1.5rem', height: '1.5rem' }} />
            <div>
                <h3 className={h3Class}>{label}</h3>
                <p className={pClass}>{description}</p>
            </div>
        </div>
    );
}

const Stepper = ({ steps, ...props }) => {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-between my-5">
            {steps.map((step, index) => {
                return <Step key={index} disabled={!props.active || props.current !== index} index={index} label={step.label} description={step.description} />
            })}
        </div>
    );
}

export default Stepper;