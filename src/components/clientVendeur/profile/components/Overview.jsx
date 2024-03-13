import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// action redux
import { fetchUserData } from "../../../../redux/features/user/userSlice";

function Overview() {

    const clientVendeur = useSelector((state) => state.users.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <div className="overview bg-white rad-10 d-flex align-center">
            <div className="avatar-box txt-c p-20">
                <img className="rad-half mb-10" src={`http://ofpptecomtest.infinityfreeapp.com/${localStorage.getItem("login_image")}`} alt="" />
                <h3 className="m-0">{clientVendeur?.nom} {clientVendeur?.prenom}</h3>
                {/* <p className="c-grey mt-10">Level 20</p>
                <div className="level rad-6 bg-eee p-relative">
                    <span style={{ width: "70%" }}></span>
                </div>
                <div className="rating mt-10 mb-10">
                    <i className="fa-solid fa-star c-orange fs-13"></i>
                    <i className="fa-solid fa-star c-orange fs-13"></i>
                    <i className="fa-solid fa-star c-orange fs-13"></i>
                    <i className="fa-solid fa-star c-orange fs-13"></i>
                    <i className="fa-solid fa-star c-orange fs-13"></i>
                </div>
                <p className="c-grey m-0 fs-13">550 Rating</p> */}
            </div>
            <div className="info-box w-full txt-c-mobile">
                <div className="box p-20 d-flex align-center">
                    <h4 className="c-grey fs-15 m-0 w-full">General Information</h4>
                    <div className="fs-14">
                        <span className="c-grey">Nom : </span>
                        <span>{clientVendeur?.nom}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Prénom : </span>
                        <span>{clientVendeur?.prenom}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Créer le : </span>
                        <span>{moment(clientVendeur?.created_at, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}</span>
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
                        <span>{clientVendeur?.adresse?.slice(0, 20) + (clientVendeur?.adresse?.length > 20 ? "..." : "")}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Date Of Birth: </span>
                        <span>{moment(clientVendeur?.date_de_naissance, "YYYY-MM-DD").format("DD/MM/YYYY")}</span>
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
                        <span>@{clientVendeur?.nom_d_utilisateur}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Email: </span>
                        <span>{clientVendeur?.email}</span>
                    </div>
                    <div className="fs-14">
                        <span className="c-grey">Phone: </span>
                        <span>{clientVendeur?.numero_de_telephone}</span>
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