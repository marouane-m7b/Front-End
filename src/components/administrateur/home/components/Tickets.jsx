import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategorieCount } from "../../../../redux/features/categorie/categorieSlice";
import { getModerateurCount } from "../../../../redux/features/moderateur/moderateurSlice";
import { getVendeurCount } from "../../../../redux/features/vendeur/vendeurSlice";
import { getClientVendeurCount } from "../../../../redux/features/clientVendeur/clientVendeurSlice";
import { getProduitCount } from "../../../../redux/features/produit/ProduitSlice";
import { getCommandeCount } from "../../../../redux/features/commande/commandeSlice";
import { fetchUserData } from "../../../../redux/features/administrateur/administrateurSlice";
import Loading from "../../../../miniComponents/loading/Loading";

function Tickets() {


    const dispatch = useDispatch()

    const categorieCount = useSelector((state) => state.categories.categorieCount);
    const moderateurCount = useSelector((state) => state.moderateurs.moderateurCount);
    const vendeurCount = useSelector((state) => state.vendeurs.vendeurCount);
    const clientVendeurCount = useSelector((state) => state.clientVendeurs.clientVendeurCount);
    const produitCount = useSelector((state) => state.produits.produitCount);
    const commandeCount = useSelector((state) => state.commandes.commandeCount);

    useEffect(() => {
        dispatch(getCategorieCount());
        dispatch(fetchUserData());
        dispatch(getModerateurCount());
        dispatch(getVendeurCount());
        dispatch(getClientVendeurCount());
        dispatch(getProduitCount());
        dispatch(getCommandeCount());
    }, [dispatch]);

    return (
        <div className="tickets p-20 bg-white rad-10">
            <div className="d-flex txt-c gap-20 f-wrap">
                <div className="box p-20 rad-10 fs-13 c-grey">
                    <i className="fa-solid fa-diagram-project fa-2x mb-10 c-orange"></i>
                    <span className="d-block c-black fw-bold fs-25 mb-5">{categorieCount ? categorieCount : <Loading />}</span>
                    Categories
                </div>
                <div className="box p-20 rad-10 fs-13 c-grey">
                    <i className="fas fa-user-shield fa-2x mb-10 c-blue"></i>
                    <span className="d-block c-black fw-bold fs-25 mb-5">{moderateurCount ? moderateurCount : <Loading />}</span>
                    Modérateur
                </div>
                <div className="box p-20 rad-10 fs-13 c-grey">
                    <i className="fas fa-user-check fa-2x mb-10 c-green"></i>
                    <span className="d-block c-black fw-bold fs-25 mb-5">{vendeurCount ? vendeurCount : <Loading />}</span>
                    Vendeur
                </div>
                <div className="box p-20 rad-10 fs-13 c-grey">
                    <i className="fas fa-users fa-2x mb-10 c-red"></i>
                    <span className="d-block c-black fw-bold fs-25 mb-5">{clientVendeurCount ? clientVendeurCount : <Loading />}</span>
                    Client Vendeur
                </div>
                <div className="box p-20 rad-10 fs-13 c-grey">
                    <i className="fas fa-shopping-cart fa-2x mb-10 c-red"></i>
                    <span className="d-block c-black fw-bold fs-25 mb-5">{produitCount ? produitCount : <Loading />}</span>
                    Produit
                </div>
                <div className="box p-20 rad-10 fs-13 c-grey">
                    <i className="fas fa-clipboard-list fa-2x mb-10 c-red"></i>
                    <span className="d-block c-black fw-bold fs-25 mb-5">{commandeCount ? commandeCount : <Loading />}</span>
                    Commande
                </div>
            </div>
        </div>
    )
}

export default Tickets