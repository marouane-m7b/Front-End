import { Link, useLocation, useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../miniComponents/loader/Loader";

function VendeurDrawer({ handleRemoveAuth }) {
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
            const res = await axios.post('/api/vendeur/logout');

            if (res.data.status === 200) {
                localStorage.removeItem('login_token')
                localStorage.removeItem('login_image')
                localStorage.removeItem('login_role')
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success"
                });
                handleRemoveAuth('vendeur')
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
                <h3 className="p-relative txt-c mt-0">Vendeur</h3>
                <ul>
                    <li>
                        <Link className={`${newPathSlice === "vendeur" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/vendeur">
                            <i className="fas fa-chart-pie"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "vendeur/invitation" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/vendeur/invitation">
                            <i className="fas fa-user-shield"></i>
                            <span>Invitation</span>
                        </Link>
                    </li>

                    <li>
                        <Link className={`${newPathSlice === "/vendeur/message" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/vendeur/message">
                            <i className="fas fa-user-check"></i>
                            <span>Chat</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "admin/profile" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/vendeur/profile">
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

VendeurDrawer.propTypes = {
    handleRemoveAuth: PropTypes.func.isRequired,
};

export default VendeurDrawer