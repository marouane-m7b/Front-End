import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
// action from redux
import { showMessageParVendeur } from "../../../redux/features/message/messageSlice";
import { fetchUserData } from "../../../redux/features/user/userSlice";
import { getClientVendeur } from "../../../redux/features/clientVendeur/clientVendeurSlice";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ClientVendeurMessage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const clientVendeur = useSelector((state) => state.clientVendeurs.clientVendeur);
    const messages = useSelector((state) => state.messages.messages);
    const isLoading = useSelector((state) => state.messages.isMsgVendeurLoading);

    const [messageInput, setMessageInput] = useState('');
    const imageClientVendeur = clientVendeur?.image;
    const userRole = localStorage.getItem('login_role');

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(getClientVendeur(id));
        dispatch(showMessageParVendeur(id))
    }, [id]);

    const displayMessage = () => {
        if (messages.length !== 0) {
            return messages.map((message, indexMessage) => {
                if (message.envoyer_par == userRole) {
                    return (
                        <li key={indexMessage} className="repaly">
                            <p> {message.contenu} </p>
                            <span className="time">{moment(message.created_at).format('LT')}</span>
                        </li>
                    )
                } else {
                    return (
                        <li key={indexMessage} className="sender">
                            <p>{message.contenu}</p>
                            <span className="time">{moment(message.created_at).format('LT')}</span>
                        </li>
                    )
                }
            })
        } else {
            return <h3>start discussion</h3>
        }
    }

    const envoyerMessage = async () => {
        const objData = {
            client_vendeur_id: id,
            contenu: messageInput
        }

        try {
            const res = await axios.post('/api/message/vendeur', objData);

            if (res.data.status === 200) {
                setMessageInput('')
                dispatch(showMessageParVendeur(id));
            } else {
                console.log(res.data.errors);
            }
        } catch (error) {
            console.error("Error during registration", error);
        }
    }

    // dropdown
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const showDropdown = (event) => {
        event.preventDefault();
        // const { pageX, pageY } = event;
        const { clientX, clientY } = event;

        // Mettre à jour la position de la dropdown
        setPosition({ left: clientX, top: clientY });

        // Afficher la dropdown
        setIsVisible(true);
    };
    const hideDropdown = () => {
        setIsVisible(false);
    };
    useEffect(() => {
        document.addEventListener('contextmenu', showDropdown);
        document.addEventListener('click', hideDropdown);

        // Nettoyer les gestionnaires d'événement lors du démontage du composant
        return () => {
            document.removeEventListener('contextmenu', showDropdown);
            document.removeEventListener('click', hideDropdown);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${position.left}px`,
                        top: `${position.top}px`,
                        backgroundColor: '#f00',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                        padding: '10px',
                        zIndex: 1,
                    }}
                >
                    <p>Contenu de la dropdown 1</p>
                    <p>Contenu de la dropdown 2</p>
                </div>
                // <span style={{ backgroundColor:'red',position: 'absolute',top: `${position.top}`,left: `${position.left}` }}>
                //     hello
                // </span>
            )}
            {isLoading ?
                'loading' :
                <div className="chatbox showbox">
                    <div className="modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="msg-head">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="d-flex align-items-center">
                                            <span className="chat-icon">
                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg" alt="image title" />
                                            </span>
                                            <div className="flex-shrink-0">
                                                <img className="img-fluid" style={{ width: '45px', height: '45px', borderRadius: '50%' }} src={`https://ofpptecomtest.infinityfreeapp.com/${imageClientVendeur}`} alt="user img" />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h3>{clientVendeur?.nom} {clientVendeur?.prenom}</h3>
                                                <p>{clientVendeur ? `@${clientVendeur?.nom_d_utilisateur}` : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <ul className="moreoption">
                                            <li className="navbar nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                                    aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-body">
                                <div className="msg-body">
                                    <ul>
                                        {displayMessage()}
                                    </ul>
                                </div>
                            </div>

                            <div className="send-box">
                                <form>
                                    <input type="text" className="form-control" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Write message…" />
                                    <button type="button" onClick={envoyerMessage}>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

export default ClientVendeurMessage;