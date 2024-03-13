import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../redux/features/moderateur/moderateurSlice";
import { getCountProduitByCategorie } from "../../../redux/features/produit/ProduitSlice";
import moment from "moment";

function ModerateurCategorie() {

    const dispatch = useDispatch();

    const moderateur = useSelector((state) => state.moderateurs.user);
    const produitCount = useSelector((state) => state.produits.countProduitByCategorie);

    useEffect(() => {
        if (moderateur) {
            dispatch(getCountProduitByCategorie(moderateur?.categorie?.id))
        }
    }, [dispatch, moderateur]);

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch]);
    return (
        <>
            <h1 className="p-relative">Categorie</h1>
            <div className="courses-page d-flex m-20 gap-20" style={{ maxWidth: "500px", margin: "auto" }}>
                <div className="course bg-white rad-6 p-relative">
                    {/* <img className="cover" src={moderateur?.categorie?.image} alt="image_cover" /> */}
                    <img className="cover" src={"/imgs/course-05.jpg"} alt="image_cover" />
                    <img className="instructor" src={`http://ofpptecomtest.infinityfreeapp.com/${localStorage.getItem("login_image")}`} alt="" />
                    <div className="p-20">
                        <h4 className="m-0" style={{ textAlign: "center" }}>{moderateur?.categorie?.nom}</h4>
                        <p className="description c-grey mt-15 fs-14">{moderateur?.categorie?.description}</p>
                    </div>
                    <div className="info p-15 p-relative between-flex">
                        <span className="title bg-blue c-white btn-shape">Categorie Info</span>
                        <span className="c-grey">
                            <i className="fas fa-shopping-cart"></i>
                            {produitCount}
                        </span>
                        <span className="c-grey">
                            <i className="far fa-calendar"></i>
                            {moment(moderateur?.categorie?.created_at).format('YYYY-MM-DD')}
                        </span>
                    </div>
                </div>

            </div>
        </>

    )
}

export default ModerateurCategorie