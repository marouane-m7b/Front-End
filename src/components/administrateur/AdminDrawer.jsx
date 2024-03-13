import { Link, useLocation, useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../miniComponents/loader/Loader";

function AdminDrawer({ handleRemoveAuth }) {
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
            const res = await axios.post('/api/administrateur/logout');

            if (res.data.status === 200) {
                localStorage.removeItem('login_token')
                localStorage.removeItem('login_image')
                localStorage.removeItem('login_role')
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success"
                });
                handleRemoveAuth('administrateur')
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
                <h3 className="p-relative txt-c mt-0">Administrateur</h3>
                <ul>
                    <li>
                        <Link className={`${newPathSlice === "admin/dashboard" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/admin/dashboard">
                            <i className="fas fa-chart-pie"></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "admin/moderateurs" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/admin/moderateurs">
                            <i className="fas fa-user-shield"></i>
                            <span>Modérateurs</span>
                        </Link>
                    </li>

                    <li>
                        <Link className={`${newPathSlice === "admin/vendeurs" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/admin/vendeurs">
                            <i className="fas fa-user-check"></i>
                            <span>Vendeurs</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "admin/client_vendeurs" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/admin/client_vendeurs">
                            <i className="fas fa-users"></i>
                            <span>Client Vendeurs</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "admin/categories" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/admin/categories">
                            <i className="fa-solid fa-diagram-project fa-fw"></i>
                            <span>Catégories</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "admin/produits" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/admin/produits">
                            <i className="fas fa-shopping-cart"></i>
                            <span>Produits</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "admin/commandes" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/admin/commandes">
                            <i className="fas fa-clipboard-list"></i>
                            <span>Commandes</span>
                        </Link>
                    </li>
                    <li>
                        <Link className={`${newPathSlice === "admin/profile" ? "active" : ""} d-flex align-center fs-14 c-black rad-6 p-10`} to="/admin/profile">
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

AdminDrawer.propTypes = {
    handleRemoveAuth: PropTypes.func.isRequired,
};

export default AdminDrawer