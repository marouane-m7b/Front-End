import { Link, useLocation, useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../miniComponents/loader/Loader";

function ModerateurDrawer({ handleRemoveAuth }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    let path = currentPath;
    let newPathSlice = path.slice(1);


    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogout = async (event) => {
        event.preventDefault();

        setIsSubmitting(true)

        try {
            const res = await axios.post('/api/moderateur/logout');

            if (res.data.status === 200) {
                localStorage.removeItem('login_token')
                localStorage.removeItem('login_image')
                localStorage.removeItem('login_role')
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success"
                });
                handleRemoveAuth('moderateur')
                navigate('/auth')
            }
        } catch (error) {
            console.error("Error during Loggin out", error);
        } finally {
            setIsSubmitting(false)
        }
    };


    return (
        <>
            {isSubmitting && <div style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                background: "#00000069",
                zIndex: "999",
                display: "grid",
                placeItems: "center"
            }}>
                <Loader />
            </div>}
            <div className="sidebar bg-white p-20 p-relative">
                <h3 className="p-relative txt-c mt-0">Moderateur</h3>
                <ul>
                    <li>
                        <Link className={`${newPathSlice === "moderateur/dashboard" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/moderateur/dashboard">
                            <i className="fas fa-chart-pie"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "moderateur/categorie" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/moderateur/categorie">
                            <i className="fa-solid fa-diagram-project fa-fw"></i>
                            <span>Catégorie</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "moderateur/produits" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/moderateur/produits">
                            <i className="fas fa-shopping-cart"></i>
                            <span>Produits</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "moderateur/profile" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/moderateur/profile">
                            <i className="fas fa-user"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li onClick={handleLogout}>
                        <Link className={`d-flex align-center fs-14 c-black rad-6 p-10`}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

ModerateurDrawer.propTypes = {
    handleRemoveAuth: PropTypes.func.isRequired,
};

export default ModerateurDrawer