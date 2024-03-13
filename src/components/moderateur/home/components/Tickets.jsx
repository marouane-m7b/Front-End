import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../../redux/features/moderateur/moderateurSlice";
import Loading from "../../../../miniComponents/loading/Loading";
import { getCountProduitByCategorie } from "../../../../redux/features/produit/ProduitSlice";
// import { getProduitByCategorie } from "../../../../redux/features/produit/ProduitSlice";

function Tickets() {


    const dispatch = useDispatch();

    const idModerateur = useSelector((state) => state.moderateurs.user?.categorie_id);
    const categorieName = useSelector((state) => state.moderateurs.user?.categorie?.nom);
    const produitCount = useSelector((state) => state.produits.countProduitByCategorie);
    // const produits = useSelector((state) => state.produits.produitsCategorie);


    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch]);

    useEffect(() => {
        if (idModerateur) {
            dispatch(getCountProduitByCategorie(idModerateur))
            // dispatch(getProduitByCategorie(idModerateur))
        }
    }, [dispatch, idModerateur]);

    return (
        <div className="tickets p-20 bg-white rad-10">
            <div className="d-flex txt-c gap-20 f-wrap">
                <div className="box p-20 rad-10 fs-13 c-grey">
                    <i className="fa-solid fa-diagram-project fa-2x mb-10 c-orange"></i>
                    <span className="d-block c-black fw-bold fs-25 mb-5">{categorieName ? categorieName : <Loading />}</span>
                    Categorie
                </div>
                <div className="box p-20 rad-10 fs-13 c-grey">
                    <i className="fas fa-shopping-cart fa-2x mb-10 c-red"></i>
                    <span className="d-block c-black fw-bold fs-25 mb-5">{produitCount ? produitCount : <Loading />}</span>
                    Produits
                </div>
            </div>
        </div>
    )
}

export default Tickets