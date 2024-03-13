import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// action redux
import { fetchVendeurs } from "../../../redux/features/vendeur/vendeurSlice";
import ClientVendeurVendeur from "./ClientVendeurVendeur";

const ClientVendeurVendeurList = () => {

    const dispatch = useDispatch();
    const vendeurs = useSelector((state) => state.vendeurs.vendeurs);

    useEffect(() => {
        dispatch(fetchVendeurs());
    }, []);

    const displayVendeurList = () => {
        return vendeurs.map((vendeur, indexVendeur) => {
            return <ClientVendeurVendeur key={indexVendeur} vendeur={vendeur} />
        })
    }

    return (
        <>
            <div className="friends-page d-grid m-20 gap-20">
                {displayVendeurList()}
            </div>
        </>
    );
}

export default ClientVendeurVendeurList;