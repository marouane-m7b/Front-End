import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageNotFound from './components/frontend/PageNotFound';
import AdminSideBar from './components/administrateur/AdminLayout';
import ModerateurSideBar from './components/moderateur/ModerateurLayout';
import VendeurSideBar from './components/vendeur/VendeurLayout';
import ClientVendeurLayout from './components/clientVendeur/ClientVendeurLayout';
import AdminVendeur from './components/administrateur/vendeurs/AdminVendeur';
import AdminModerateur from './components/administrateur/moderateurs/AdminModerateur';
import AdminCategorie from './components/administrateur/categories/AdminCategorie';
import AdminHome from './components/administrateur/home/AdminHome';
import AdminProduit from './components/administrateur/produits/AdminProduit';
import AdminClientVendeur from './components/administrateur/client_vendeurs/AdminClientVendeur';
import AdminCommande from './components/administrateur/commande/AdminCommande';
import ModerateurHome from './components/moderateur/home/ModerateurHome';
import ModerateurCategorie from './components/moderateur/categorie/ModerateurCategorie';
import ModerateurProfile from './components/moderateur/profile/ModerateurProfile';
import VendeurProfile from './components/clientVendeur/vendeur/ClientVendeurVendeurProfile';
import InvitationList from './components/vendeur/invitation/InvitationList';
import ClientVendeur from './components/vendeur/message/ClientVendeur';
import ClientVendeurMessage from './components/vendeur/message/ClientVendeurMessage';
import AdminProfile from './components/administrateur/profile/AdminProfile';
import ModerateurProduit from './components/moderateur/vendeurs/ModerateurProduit';
import ClientVendeurProfile from './components/clientVendeur/profile/ClientVendeurProfile';
import Chat from './components/clientVendeur/messages/Chat';
import ChatContainer from './components/clientVendeur/messages/ChatContainer';
import ClientVendeurVendeurList from './components/clientVendeur/vendeur/ClientVendeurVendeurList';
import ClientVendeurVendeurProfile from './components/clientVendeur/vendeur/ClientVendeurVendeurProfile';
import VendeurProfile2 from './components/vendeur/profile/VendeurProfile';
import AuthForm from './components/frontend/Auth/AuthForm';
import Loader from './miniComponents/loader/Loader';




const AppRoutes = () => {
    const [isAdminAuth, setIsAdminAuth] = useState(false);
    const [isModerateurAuth, setIsModerateurAuth] = useState(false);
    const [isVendeurAuth, setIsVendeurAuth] = useState(false);
    const [isClientAuth, setIsClientAuth] = useState(false);
    const [noOneLogged, setNoOneLogged] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setNoOneLogged(!(isAdminAuth || isClientAuth || isVendeurAuth || isModerateurAuth))
    }, [isAdminAuth, isModerateurAuth, isVendeurAuth, isClientAuth])

    useEffect(() => {
        if (localStorage.getItem('login_token')) {
            switch (localStorage.getItem('login_role')) {
                case 'administrateur':
                    axios.get('/api/administrateur/isAdminAuth').then(res => {
                        if (res.data.status === 200) {
                            setIsAdminAuth(true);
                            setLoading(false);
                        }
                    }).catch(error => {
                        console.error("Error checking admin authentication:", error);
                        setLoading(false);
                    });

                    return () => {
                        setIsAdminAuth(false);
                    };
                case 'moderateur':
                    axios.get('/api/moderateur/isModerateurAuth').then(res => {
                        if (res.data.status === 200) {
                            setIsModerateurAuth(true);
                            setLoading(false);
                        }
                    }).catch(error => {
                        console.error("Error checking moderateur authentication:", error);
                        setLoading(false);
                    });

                    return () => {
                        setIsModerateurAuth(false);
                    };
                case 'vendeur':
                    axios.get('/api/vendeur/isVendeurAuth').then(res => {
                        if (res.data.status === 200) {
                            setIsVendeurAuth(true);
                            setLoading(false);
                        }
                    }).catch(error => {
                        console.error("Error checking vendeur authentication:", error);
                        setLoading(false);
                    });

                    return () => {
                        setIsVendeurAuth(false);
                    };
                case 'client_vendeur':
                    axios.get('/api/client_vendeur/isClientAuth').then(res => {
                        if (res.data.status === 200) {
                            setIsClientAuth(true);
                            setLoading(false);
                        }
                    }).catch(error => {
                        console.error("Error checking client authentication:", error);
                        setLoading(false);
                    });

                    return () => {
                        setIsClientAuth(false);
                    };
                default:
                    setLoading(false);
                    break;
            }
        } else {
            setLoading(false);
        }
    }, []);

    function handleAddAuth(role) {
        switch (role) {
            case "administrateur":
                setIsAdminAuth(true);
                break;
            case "moderateur":
                setIsModerateurAuth(true);
                break;
            case "vendeur":
                setIsVendeurAuth(true);
                break;
            case "client_vendeur":
                setIsClientAuth(true);
                break;
            default:
                return;
        }
    }

    function handleRemoveAuth(role) {
        switch (role) {
            case "administrateur":
                setIsAdminAuth(false);
                break;
            case "moderateur":
                setIsModerateurAuth(false);
                break;
            case "vendeur":
                setIsVendeurAuth(false);
                break;
            case "client_vendeur":
                setIsClientAuth(false);
                break;
            default:
                return;
        }
    }

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response && err.response.status === 401) {
            console.error("Unauthorized request:", err.response.data.message);
            setLoading(false)
        }
        return Promise.reject(err);
    });


    if (loading) {
        return <div className='circular-container'>
            <Loader />
        </div>;
    }






    return (
        <Routes>
                <Route
                    path="/auth"
                    element={
                        isAdminAuth ? (
                            <Navigate to="/admin/dashboard" />
                        ) : isModerateurAuth ? (
                            <Navigate to="/moderateur/dashboard" />
                        ) : isVendeurAuth ? (
                            <Navigate to="/vendeur/dashboard" />
                        ) : isClientAuth ? (
                            <Navigate to="/" />
                        ) : (
                            <AuthForm handleAddAuth={handleAddAuth} />
                        )
                    } />
            <Route path="/admin" element=
                {isAdminAuth ? (
                    <AdminSideBar handleRemoveAuth={handleRemoveAuth} />
                ) : isModerateurAuth ? (
                    <Navigate to="/moderateur/dashboard" />
                ) : isVendeurAuth ? (
                    <Navigate to="/vendeur/dashboard" />
                ) : isClientAuth ? (
                    <Navigate to="/" />
                ) : (
                    <Navigate to="/auth" />
                )}>
                <Route path="dashboard" element={<AdminHome />} />
                <Route path="moderateurs" element={<AdminModerateur />} />
                <Route path="vendeurs" element={<AdminVendeur />} />
                <Route path="client_vendeurs" element={<AdminClientVendeur />} />
                <Route path="categories" element={<AdminCategorie />} />
                <Route path="produits" element={<AdminProduit />} />
                <Route path="commandes" element={<AdminCommande />} />
                <Route path="profile" element={<AdminProfile />} />
            </Route>
            <Route path="/moderateur" element={
                isModerateurAuth ? (
                    <ModerateurSideBar handleRemoveAuth={handleRemoveAuth} />
                ) : isAdminAuth ? (
                    <Navigate to="/admin/dashboard" />
                ) : isVendeurAuth ? (
                    <Navigate to="/vendeur/dashboard" />
                ) : isClientAuth ? (
                    <Navigate to="/" />
                ) : (
                    <Navigate to="/auth" />
                )}>
                <Route path="dashboard" element={<ModerateurHome />} />
                <Route path="categorie" element={<ModerateurCategorie />} />
                <Route path="profile" element={<ModerateurProfile />} />
                <Route path="produits" element={<ModerateurProduit />} />
            </Route>
            <Route path="/vendeur" element={
                isVendeurAuth ? (
                    <VendeurSideBar handleRemoveAuth={handleRemoveAuth} />
                ) : isAdminAuth ? (
                    <Navigate to="/admin/dashboard" />
                ) : isModerateurAuth ? (
                    <Navigate to="/moderateur/dashboard" />
                ) : isClientAuth ? (
                    <Navigate to="/" />
                ) : (
                    <Navigate to="/auth" />
                )}>
                <Route path="profile" element={<VendeurProfile2 />} />
                <Route path="invitation" element={<InvitationList />} />
                {/* <Route path="message" element={<ClientVendeur />} />
                <Route path="message/:id" element={<ClientVendeurMessage />} /> */}
                <Route path="message" element={<ClientVendeur />} >
                    <Route path='' element={<img src='/discussion.webp' style={{
                        width: '100%',
                        height: '100vh',
                        backgroundSize: 'cover'
                    }} />} />
                </Route>
                <Route path="message/:id" element={<ClientVendeur />} >
                    <Route path="" element={<ClientVendeurMessage />} />
                </Route>
            </Route>
            <Route path="/" element={
                isClientAuth ? (
                    <ClientVendeurLayout isClientAuth={isClientAuth} handleRemoveAuth={handleRemoveAuth} />
                ) : isAdminAuth ? (
                    <Navigate to="/admin/dashboard" />
                ) : isModerateurAuth ? (
                    <Navigate to="/moderateur/dashboard" />
                ) : isVendeurAuth ? (
                    <Navigate to="/vendeur" />
                ) : (
                    <Navigate to="/auth" />
                )}>
                <Route path="profile" element={<ClientVendeurProfile />} />
                <Route path="vendeurs" element={<ClientVendeurVendeurList />} />
                <Route path="profile/:id" element={<ClientVendeurVendeurProfile />} />
                <Route path="message" element={<ChatContainer />} >
                    <Route path='' element={<img src='/discussion.webp' style={{
                        width: '100%',
                        height: '100vh',
                        backgroundSize: 'cover'
                    }} />} />
                </Route>
                <Route path="message/:id" element={<ChatContainer />} >
                    <Route path="" element={<Chat />} />
                </Route>
            </Route>
            <Route path="*" element={noOneLogged ? <Navigate to="/auth" /> : <PageNotFound />} />
        </Routes>
    );
};

export default AppRoutes;
