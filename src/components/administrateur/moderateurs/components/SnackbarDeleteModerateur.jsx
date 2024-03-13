import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteModerateurs } from "../../../../redux/features/moderateur/moderateurSlice";
import PropTypes from 'prop-types';
import Alert from "../../../../miniComponents/alert/Alert";

function SnackbarDeleteModerateur({ handleReload }) {

    const dispatch = useDispatch();

    const deleteStatus = useSelector((state) => state.moderateurs.deleteStatus);
    const [isSucces, setIsSucces] = useState(false)


    const handleDeleteFulfilled = (dispatch, status) => {
        dispatch(deleteModerateurs.fulfilled(status));
        setTimeout(() => {
            dispatch(deleteModerateurs.resetStatus());
        }, 3001);
    };

    useEffect(() => {
        if (deleteStatus === 200) {
            handleReload()
            setIsSucces(true)
            setTimeout(() => {
                setIsSucces(false)
            }, 3001)
            handleDeleteFulfilled(dispatch, deleteStatus)
        }
    }, [deleteStatus, setIsSucces, dispatch, handleReload])

    return (
        <Alert status={isSucces} content="la suppression du moderateur est effectue"/>
    )
}

SnackbarDeleteModerateur.propTypes = {
    handleReload: PropTypes.func.isRequired,
};

export default SnackbarDeleteModerateur