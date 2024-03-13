import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
// action redux
import { getVendeur } from "../../../redux/features/vendeur/vendeurSlice";
import { showMessageParClientVendeur } from "../../../redux/features/message/messageSlice";
import { fetchUserData } from "../../../redux/features/user/userSlice";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const vendeur = useSelector((state) => state.vendeurs.vendeur);
    const messages = useSelector((state) => state.messages.messages);
    const isLoading = useSelector((state) => state.messages.isMsgClientVendeurLoading);

    const [messageInput, setMessageInput] = useState('');
    const imageVendeur = vendeur?.image;
    const userRole = localStorage.getItem('login_role');

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(getVendeur(id));
        dispatch(showMessageParClientVendeur(id))
    }, [id])

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
            vendeur_id: id,
            contenu: messageInput
        }

        try {
            const res = await axios.post('/api/message/client_vendeur', objData);

            if (res.data.status === 200) {
                setMessageInput('')
                dispatch(showMessageParClientVendeur(id));
            } else {
                console.log(res.data.errors);
            }
        } catch (error) {
            console.error("Error during registration", error);
        }
    }

    return (
        <>

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
                                                <img className="img-fluid" style={{ width: '45px', height: '45px', borderRadius: '50%' }} src={`http://localhost:8000/${imageVendeur}`} alt="user img" />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h3>{vendeur.nom} {vendeur.prenom}</h3>
                                                <p>@{vendeur.nom_d_utilisateur}</p>
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

export default Chat;