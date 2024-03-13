import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
// action redux
import { fetchUserData, getVendeur } from "../../../redux/features/vendeur/vendeurSlice";
import { fetchAutorisations } from "../../../redux/features/autorisation/autorisationsSlice";
import { getAutorisationsExist } from "../../../redux/features/clientVendeur/clientVendeurSlice";


const ClientVendeurVendeurProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const vendeur = useSelector((state) => state.vendeurs.vendeur);
    const user = useSelector((state) => state.vendeurs.user);
    const existAutorisation = useSelector((state) => state.vendeurs.autorisationExist);

    useEffect(() => {
        dispatch(getVendeur(id));
        dispatch(fetchUserData())
            .then(data => {
                dispatch(getAutorisationsExist({ idClientV: data.payload.id, idVendeur: id }))
            });
        dispatch(fetchAutorisations())
    }, []);

    // function
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('vendeur_id', id);
        formData.append('client_vendeur_id', user?.id);
        formData.append('pourcentage', 0);

        setIsSubmitting(true);
        try {
            const res = await axios.post(`/api/autorisation`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success"
                });
                dispatch(getAutorisationsExist({ idClientV: user?.id, idVendeur: id }));
            } else {
                console.log(res.data.errors);
            }
        } catch (error) {
            console.error("Error during registration", error);
        } finally {
            setIsSubmitting(false)
        }
    };
    const handleAnnuler = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.delete(`/api/autorisation/client_vendeur/${user?.id}/vendeur/${id}`);

            if (res.data.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success"
                });
                dispatch(getAutorisationsExist({ idClientV: user?.id, idVendeur: id }));
            } else {
                console.log(res.data.errors);
            }
        } catch (error) {
            console.error("Error during registration", error);
        }
    }
    return (
        <>
            {/* <Card sx={{ width: 520, margin: '0 auto' }}>
                <div className="d-flex align-items-center justify-content-between">
                    <Typography level="title-md">{vendeur?.nom} {vendeur?.prenom}</Typography>
                    <Typography level="body-md">{vendeur?.nom_d_utilisateur}</Typography>
                </div>
                <AspectRatio minHeight="120px" maxHeight="200px">
                    <img
                        src={`http://localhost:8000/${vendeur?.image}`}
                        loading="lazy"
                        alt={`image de ${vendeur?.nom} ${vendeur?.prenom}`}
                    />
                </AspectRatio>
                <CardContent>
                    <Typography level="body-md">Adresse : {vendeur?.adresse}</Typography>
                    <Typography level="body-md">Email : {vendeur?.email}</Typography>
                    <Typography level="body-md">Numero de telephone : {vendeur?.numero_de_telephone}</Typography>
                    <Typography level="body-md">Date De Naissance : {moment(vendeur?.date_de_naissance).format('YYYY-MM-DD hh:mm:ss')}</Typography>
                    <Typography level="body-md">Date De création du compte : {moment(vendeur?.created_at).format('YYYY-MM-DD hh:mm:ss')}</Typography>

                    <div className="btnSection">
                        {existAutorisation ?
                            <Button
                                variant="solid"
                                size="md"
                                color="primary"
                                aria-label="Explore Bahamas Islands"
                                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                onClick={handleAnnuler}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress /> : 'Annuler'}
                            </Button>
                            :
                            <Button
                                variant="solid"
                                size="md"
                                color="primary"
                                aria-label="Explore Bahamas Islands"
                                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress /> : 'Suiver'}
                            </Button>
                        }
                    </div>
                </CardContent>
            </Card> */}

            <div className="overview bg-white rad-10 d-flex align-center">
                <div className="avatar-box txt-c p-20">
                    <img className="rad-half mb-10" src={`http://localhost:8000/${vendeur?.image}`} alt="" />
                    <h3 className="m-0">{vendeur?.nom} {vendeur?.prenom}</h3>
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
                            <span>{vendeur?.adresse?.slice(0, 20) + (vendeur?.adresse?.length > 20 ? "..." : "")}</span>
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
        </>
    );
}

export default ClientVendeurVendeurProfile;