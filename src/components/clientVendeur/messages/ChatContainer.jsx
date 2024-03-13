// import './chatContainer.css' ???
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// action redux
import { getVendeurWithClientVendeur } from '../../../redux/features/clientVendeur/clientVendeurSlice';
import { fetchUserData } from '../../../redux/features/user/userSlice';

const ChatContainer = () => {
    const dispatch = useDispatch();
    const vendeurs = useSelector((state) => state.clientVendeurs.vendeurs);
    const user = useSelector((state) => state.users.user);

    useEffect(() => {
        dispatch(fetchUserData())
            .then(data => {
                dispatch(getVendeurWithClientVendeur(data.payload.id))
            });
    }, [user?.id])

    const displayVendeurList = () => {
        if (vendeurs.length !== 0) {
            return vendeurs.map((vendeur, indexVendeur) => {
                return (
                    <Link key={indexVendeur} to={`/message/${vendeur.id}`} className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                        <div className="flex-shrink-0">
                            <img style={{ width: '75px', height: '75px', borderRadius: '50%' }} className="img-fluid" src={`https://ofpptecomtest.infinityfreeapp.com/${vendeur.image}`} alt="user img" />
                            {/* <span className="active"></span> */}
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h3>{vendeur.nom_d_utilisateur}</h3>
                            <p>{vendeur.email}</p>
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
                                                        <FontAwesomeIcon icon='plus' size='lg'/>
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="modal-body">
                                                <div className="chat-lists">
                                                    <div className="tab-content" id="myTabContent">
                                                        <div className="tab-pane fade show active" id="Open" role="tabpanel" aria-labelledby="Open-tab">
                                                            <div className="chat-list mt-3">
                                                                <Link to={'/message'} style={{ display: 'inline-block', padding: '10px 20px', fontSize: '16px', textAlign: 'center', textDecoration: 'none', cursor: 'pointer', border: '2px solid #3498db', color: '#3498db', borderRadius: '5px', transition: 'background-color 0.3s ease' }}>Close Discussion</Link>
                                                                {displayVendeurList()}
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

export default ChatContainer