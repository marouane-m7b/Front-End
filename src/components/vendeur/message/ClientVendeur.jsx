import { useEffect } from 'react'
import './boxMessage.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// action from redux
import { fetchUserData } from '../../../redux/features/user/userSlice';

const ClientVendeur = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const clientVendeurs = user?.client_vendeur;

    useEffect(() => {
        dispatch(fetchUserData());
    }, [user?.id])

    const displayVendeurList = () => {
        if (clientVendeurs?.length !== 0) {
            return clientVendeurs?.map((clientVendeur, indexClientVendeur) => {
                return (
                    <Link key={indexClientVendeur} to={`/vendeur/message/${clientVendeur.id}`} className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                        <div className="flex-shrink-0">
                            <img style={{ width: '75px', height: '75px', borderRadius: '50%' }} className="img-fluid" src={`https://ofpptecomtest.infinityfreeapp.com/${clientVendeur.image}`} alt="user img" />
                            {/* <span className="active"></span> */}
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h3>{clientVendeur.nom_d_utilisateur}</h3>
                            <p>{clientVendeur.email}</p>
                        </div>
                    </Link>
                )
            })
        } else {
            return 'wait';
        }
    }

    return (
        <>
            <section className="message-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="chat-area">
                                <div className="chatlist">
                                    <div className="modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="chat-header">
                                                <div className="msg-search">
                                                    <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Search" aria-label="search" />
                                                    <Link className="add" to="/vendeurs">
                                                        <FontAwesomeIcon icon='plus' size='lg' />
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="modal-body">
                                                <div className="chat-lists">
                                                    <div className="tab-content" id="myTabContent">
                                                        <div className="tab-pane fade show active" id="Open" role="tabpanel" aria-labelledby="Open-tab">
                                                            <div className="chat-list mt-3">
                                                                {clientVendeurs ?
                                                                    <>
                                                                        <Link to={'/vendeur/message'} style={{ display: 'inline-block', padding: '10px 20px', fontSize: '16px', textAlign: 'center', textDecoration: 'none', cursor: 'pointer', border: '2px solid #3498db', color: '#3498db', borderRadius: '5px', transition: 'background-color 0.3s ease' }}>Close Discussion</Link>
                                                                        {displayVendeurList()}
                                                                    </>
                                                                    : ''}
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="Closed" role="tabpanel" aria-labelledby="Closed-tab">

                                                            <div className="chat-list">
                                                                <a href="#" className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img" />
                                                                        <span className="active"></span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <h3>Mehedi Hasan</h3>
                                                                        <p>front end developer</p>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="chatbox showbox">
                                    <Outlet />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default ClientVendeur;