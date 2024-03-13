import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchUserData } from "../../../../redux/features/vendeur/vendeurSlice";

function Overview() {

    const vendeur = useSelector((state) => state.vendeurs.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <div className="overview bg-white rad-10 d-flex align-center">
            <div className="avatar-box txt-c p-20">
                <img className="rad-half mb-10" src={`http://localhost:8000/${localStorage.getItem("login_image")}`} alt="" />
                <h3 className="m-0">{vendeur?.nom} {vendeur?.prenom}</h3>
            </div>
            <div className="info-box w-full txt-c-mobile">
                <div className="box p-20 d-flex align-center">
                    <h4 className="c-grey fs-15 m-0 w-full">General Information</h4>
                    <div className="fs-14">
                        <span className="c-grey">Nom : </span>
                        <span>{vendeur?.nom}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Prénom : </span>
                        <span>{vendeur?.prenom}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Créer le : </span>
                        <span>{moment(vendeur?.created_at, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}</span>
                    </div>
                    <div className="fs-14">
                        <label>
                            <input className="toggle-checkbox" type="checkbox" />
                            <div className="toggle-switch"></div>
                        </label>
                    </div>
                </div>
                <div className="box p-20 d-flex align-center">
                    <h4 className="c-grey w-full fs-15 m-0">Personal Information</h4>
                    <div className="fs-14">
                        <span className="c-grey">Adresse: </span>
                        <span>{vendeur?.adresse.slice(0, 20) + (vendeur?.adresse.length > 20 ? "..." : "")}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Date Of Birth: </span>
                        <span>{moment(vendeur?.date_de_naissance, "YYYY-MM-DD").format("DD/MM/YYYY")}</span>
                    </div>
                    <div></div>
                    <div className="fs-14">
                        <label>
                            <input className="toggle-checkbox" type="checkbox" defaultChecked />
                            <div className="toggle-switch"></div>
                        </label>
                    </div>
                </div>
                <div className="box p-20 d-flex align-center">
                    <h4 className="c-grey w-full fs-15 m-0">Contact Information</h4>
                    <div className="fs-14">
                        <span className="c-grey">Nom d&apos;utilisateur: </span>
                        <span>@{vendeur?.nom_d_utilisateur}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Email: </span>
                        <span>{vendeur?.email}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Phone: </span>
                        <span>{vendeur?.numero_de_telephone}</span>
                    </div>
                    <div className="fs-14">
                        <label>
                            <input className="toggle-checkbox" type="checkbox" />
                            <div className="toggle-switch"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview