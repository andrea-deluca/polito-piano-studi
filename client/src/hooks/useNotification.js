import { toast } from "react-toastify";

const useNotification = () => {
    const notification = {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        draggable: true,
        draggableDirection: 'x',
        progress: undefined,
    }

    const notify = {
        error: (error) => {
            toast.error(error, {
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
                ...notification,
            });
        },

        warning: (message) => {
            toast.warning(message, {
                type: toast.TYPE.WARNING,
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
                ...notification,
            });
        },

        success: (response) => {
            toast.success(response, {
                type: toast.TYPE.SUCCESS,
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
                ...notification,
            });
        },

        promise: {
            loading: (message) => {
                return toast.loading(message, {
                    type: toast.TYPE.DEFAULT,
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'colored',
                    ...notification,
                });
            },

            success: (id, response) => {
                toast.update(id, {
                    isLoading: false,
                    render: response,
                    type: toast.TYPE.SUCCESS,
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'colored',
                    ...notification,
                });
            },

            error: (id, error) => {
                toast.update(id, {
                    isLoading: false,
                    render: error,
                    type: toast.TYPE.ERROR,
                    position: toast.POSITION.TOP_RIGHT,
                    theme: 'colored',
                    ...notification,
                });
            }
        }
    }

    return notify;
}

export default useNotification;