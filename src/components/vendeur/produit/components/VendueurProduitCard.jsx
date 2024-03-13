import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduits } from "../../../../redux/features/produit/ProduitSlice";
import CreateProduit from "./CreateProduit";
import UpdateProduit from "./UpdateProduit";

const VendueurProduitCard = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.produits.produits);
    const [open, setOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [reload, setReload] = useState(false)
    const [updateId, setUpdateId] = useState(false)
    // function
    const handleReload = () => {
        setReload(!reload)
    }
    function handleOpen(bool) {
        setOpen(bool)
    }
    function handleUpdate(bool, id) {
        setUpdateId(id)
        setUpdateOpen(bool)
    }
    useEffect(() => {
        dispatch(fetchProduits());
    }, [dispatch, reload]);

    return (
        <>
            {open && <CreateProduit open={open} handleOpen={handleOpen} handleReload={handleReload} />}
            {updateOpen && <UpdateProduit open={updateOpen} handleUpdate={handleUpdate} handleReload={handleReload} id={+updateId} />}
            <div class="card">
                <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
                <div class="card-body">
                    <h4 class="card-title">Title</h4>
                    <p class="card-text">Text</p>
                </div>
            </div>
            
        </>
    )
}

export default VendueurProduitCard;