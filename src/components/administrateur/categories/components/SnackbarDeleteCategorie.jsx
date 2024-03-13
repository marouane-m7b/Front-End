import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategorie } from "../../../../redux/features/categorie/categorieSlice";
import PropTypes from 'prop-types';
import Alert from "../../../../miniComponents/alert/Alert";

function SnackbarDeleteCategorie({ handleReload }) {

    const dispatch = useDispatch();

    const deleteStatus = useSelector((state) => state.categories.deleteStatus);
    const [isSucces, setIsSucces] = useState(false)


    const handleDeleteFulfilled = (dispatch, status) => {
        dispatch(deleteCategorie.fulfilled(status));
        setTimeout(() => {
            dispatch(deleteCategorie.resetStatus());
        }, 3001);
    };

    useEffect(() => {
        if (deleteStatus === 200) {
            handleReload()
            setIsSucces(true)
            setTimeout(() => {
                setIsSucces(false)
            }, 6000)
            handleDeleteFulfilled(dispatch, deleteStatus)
        }
    }, [deleteStatus, setIsSucces, dispatch, handleReload])

    return (
        <Alert status={isSucces} content="La suppression de la categorie est effectue"/>
    )
}

SnackbarDeleteCategorie.propTypes = {
    handleReload: PropTypes.func.isRequired,
};

export default SnackbarDeleteCategorie