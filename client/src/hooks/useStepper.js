import { useState } from "react"

const useStepper = () => {
    const [stepper, setStepper] = useState({
        active: false,
        current: 0,
        context: null
    })

    const start = () => {
        setStepper((old) => ({ ...old, active: true }));
    }

    const next = () => {
        setStepper((old) => ({ ...old, current: old.current + 1 }))
    }

    const data = {
        put: (data) => {
            setStepper((old) => ({ ...old, context: { ...old.context, ...data } }))
        },
    }

    return { ...stepper, start, next, data };
}

export default useStepper;