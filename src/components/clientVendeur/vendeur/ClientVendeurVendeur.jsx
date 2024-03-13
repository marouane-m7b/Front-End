import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
// action redux
import { getCountVendeurProduit } from "../../../redux/features/vendeur/vendeurSlice";
import { getAutorisationsExist } from "../../../redux/features/clientVendeur/clientVendeurSlice";
import Loader from "../../../miniComponents/loader/Loader";

const ClientVendeurVendeur = ({ vendeur }) => {
    const dispatch = useDispatch();
    const [produitLength, setProduitLength] = useState(0);

    const isLoading = useSelector(state => state.clientVendeurs.isLoading);
    const [exist, setExist] = useState(false);

    const getData = async () => {
        const res = await dispatch(getAutorisationsExist(vendeur.id));
        console.log('get Data');
        if (res.payload !== undefined) {
            console.log('if condition');
            setExist(res.payload.autorisationExists);
        }
    }
    // console.log(exist);
    
    useEffect(() => {
        console.log('useEffect');
        getData();

        dispatch(getCountVendeurProduit(vendeur?.id))
            .then(data => {
                setProduitLength(data.payload.produit_count)
            });
    }, []);

    return (
        <div className="friend bg-white rad-6 p-20 p-relative">
            <div className="contact">
                {/* <i className="fa-solid fa-phone mr-15"></i> */}
                {
                    !isLoading ?
                        exist ?
                            <Link to={`/message/${vendeur?.id}`}>
                                <i className="fa-regular fa-envelope"></i>
                            </Link>
                            : ''
                        : <Loader />
                }
            </div>
            <div className="txt-c">
                <img className="rad-half mt-10 mb-10 w-100 h-100" src={`imgs/friend-01.jpg`} alt="" />
                <h4 className="m-0">{vendeur?.id} - {vendeur?.nom} {vendeur?.prenom}</h4>
                <p className="c-grey fs-13 mt-5 mb-0">Vendeur</p>
            </div>
            <div className="icons fs-14 p-relative">
                <div className="mb-10">
                    <i className="fa-regular fa-face-smile fa-fw"></i>
                    <span>{vendeur?.client_vendeur.length} Friends</span>
                </div>
                <div className="mb-10">
                    <i className="fa-solid fa-code-commit fa-fw"></i>
                    <span>{produitLength} Produit</span>
                </div>
                {/* {isVip && <span className="vip fw-bold c-orange">VIP</span>} */}
            </div>
            <div className="vendeur between-flex fs-13">
                <span className="c-grey">Joined {vendeur?.created_at}</span>
                <div>
                    <Link className="bg-blue c-white btn-shape mr-15" to="/profile">
                        Profile
                    </Link>
                    <Link className="bg-red c-white btn-shape" to="#">
                        Remove
                    </Link>
                </div>
            </div>
        </div>
    )
}

ClientVendeurVendeur.propTypes = {
    vendeur: PropTypes.object.isRequired,
};
export default ClientVendeurVendeur;