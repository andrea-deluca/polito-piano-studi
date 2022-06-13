import { useState } from "react"

const useConfirm = (callback) => {
    const [show, setShow] = useState(false);

    const onShow = () => {
        setShow(true);
    }

    const onHide = () => {
        setShow(false);
    }

    const onConfirm = () => {
        callback();
        onHide();
    }

    return [show, { onShow, onHide, onConfirm }];
}

export default useConfirm;