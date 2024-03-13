import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';


function Register({ handleCheck }) {

    const [isSubmitting, setIsSubmitting] = useState(false);


    const [registerInput, setRegisterInput] = useState({
        prenom: "",
        nom: "",
        nom_d_utilisateur: "",
        email: "",
        numero_de_telephone: "",
        adresse: "",
        date_de_naissance: "2000-01-01",
        mot_de_passe: "",
        role: "administrateur",
        errors: {
            prenom: "",
            nom: "",
            nom_d_utilisateur: "",
            email: "",
            numero_de_telephone: "",
            adresse: "",
            date_de_naissance: "",
            image: "",
            mot_de_passe: "",
        }
    })
    const [picture, setPicture] = useState('')

    const handleRegisterInput = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setRegisterInput(prevValue => ({ ...prevValue, [key]: value }))
    }

    const handleImage = (e) => {
        setPicture(e.target.files[0]);
    };


    const handleRegister = async (event) => {
        event.preventDefault();

        const formData = new FormData()

        formData.append('image', picture);
        formData.append('prenom', registerInput.prenom)
        formData.append('nom', registerInput.nom)
        formData.append('nom_d_utilisateur', registerInput.nom_d_utilisateur)
        formData.append('email', registerInput.email)
        formData.append('numero_de_telephone', registerInput.numero_de_telephone)
        formData.append('adresse', registerInput.adresse)
        formData.append('date_de_naissance', registerInput.date_de_naissance)
        formData.append('mot_de_passe', registerInput.mot_de_passe)


        setIsSubmitting(true)

        try {
            const res = await axios.post(`/api/${registerInput.role}`, formData, {
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

                handleCheck()
            } else {
                setRegisterInput((prevValue) => ({
                    ...prevValue,
                    errors: res.data.errors,
                }));
            }
        } catch (error) {
            console.error("Error during registration", error);
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <div className="flip-card__back">
            <span></span>
            <div className="title">Sign up</div>
            {/* <form action="" className="flip-card__form">
    <input
      type="name"
      placeholder="Name"
      className="flip-card__input"
    />
    <input
      type="email"
      placeholder="Email"
      name="email"
      className="flip-card__input"
    />
    <input
      type="password"
      placeholder="Password"
      name="password"
      className="flip-card__input"
    />
    <button className="flip-card__btn">Confirm!</button>
  </form> */}
            <form encType="multipart/form-data" noValidate onSubmit={handleRegister} className="flip-card__form">
                <div className="register-form">
                    <div>
                        <input
                            minLength={3}
                            maxLength={20}
                            onChange={handleRegisterInput}
                            value={registerInput.prenom}
                            name="prenom"
                            id="prenom"
                            type="text"
                            placeholder="Prénom"
                            autoFocus
                            className="flip-card__input"
                        />
                        <div className="error-inp">{registerInput.errors.prenom}</div>
                    </div>
                    <div>
                        <input
                            onChange={handleRegisterInput}
                            value={registerInput.nom}
                            name="nom"
                            id="nom"
                            type="text"
                            placeholder="Nom"
                            className="flip-card__input"
                            minLength={3}
                            maxLength={20}
                        />
                        <div className="error-inp">{registerInput.errors.nom}</div>
                    </div>
                    <div>
                        <input
                            onChange={handleRegisterInput}
                            value={registerInput.nom_d_utilisateur}
                            name="nom_d_utilisateur"
                            id="nom_d_utilisateur"
                            type="text"
                            placeholder="Nom d'utilisateur"
                            className="flip-card__input"
                            minLength={5}
                            maxLength={25}
                        />
                        <div className="error-inp">{registerInput.errors.nom_d_utilisateur}</div>
                    </div>
                    <div>
                        <input
                            onChange={handleRegisterInput}
                            value={registerInput.email}
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="flip-card__input"
                        />
                        <div className="error-inp">{registerInput.errors.email}</div>
                    </div>
                    <div>
                        <input
                            onChange={handleRegisterInput}
                            value={registerInput.numero_de_telephone}
                            name="numero_de_telephone"
                            id="numero_de_telephone"
                            type="tel"
                            placeholder="Numéro de téléphone"
                            className="flip-card__input"
                            maxLength={10}
                            minLength={10}
                        />
                        <div className="error-inp">{registerInput.errors.numero_de_telephone}</div>
                    </div>
                    <div>
                        <input
                            onChange={handleRegisterInput}
                            value={registerInput.adresse}
                            name="adresse"
                            id="adresse"
                            type="text"
                            placeholder="Addresse"
                            className="flip-card__input"
                            maxLength={120}
                            minLength={15}
                        />
                        <div className="error-inp">{registerInput.errors.adresse}</div>
                    </div>
                    <div>
                        <input
                            onChange={handleRegisterInput}
                            value={registerInput.date_de_naissance}
                            name="date_de_naissance"
                            id="date_de_naissance"
                            type="date"
                            placeholder="Birth Date"
                            className="flip-card__input"
                        />
                        <div className="error-inp">{registerInput.errors.date_de_naissance}</div>
                    </div>
                    <div>
                        <input
                            onChange={handleRegisterInput}
                            value={registerInput.mot_de_passe}
                            name="mot_de_passe"
                            type="password"
                            id="mot_de_passe"
                            placeholder="Mot de passe"
                            className="flip-card__input"
                            minLength={8}
                            maxLength={32}
                        />
                        <div className="error-inp">{registerInput.errors.mot_de_passe}</div>
                    </div>
                    <div style={{width: '100%'}}>
                        <section style={{margin: 'auto'}}>
                            <label htmlFor="administrateur_register" className='label'>
                                <input
                                    type="radio"
                                    id="administrateur_register"
                                    name="role"
                                    value="administrateur"
                                    checked={registerInput.role === "administrateur"}
                                    onChange={handleRegisterInput}
                                    className="input"
                                />
                                <FontAwesomeIcon icon={faUserCog} /> {/* Administrator */}
                            </label>

                            <label htmlFor="vendeur_register" className='label'>
                                <input
                                    type="radio"
                                    id="vendeur_register"
                                    name="role"
                                    value="vendeur"
                                    checked={registerInput.role === "vendeur"}
                                    onChange={handleRegisterInput}
                                    className="input"
                                />
                                <FontAwesomeIcon icon={faShoppingBag} /> {/* Seller */}
                            </label>

                            <label htmlFor="client_vendeur_register" className='label'>
                                <input
                                    type="radio"
                                    id="client_vendeur_register"
                                    name="role"
                                    value="client_vendeur"
                                    checked={registerInput.role === "client_vendeur"}
                                    onChange={handleRegisterInput}
                                    className="input"
                                />
                                <FontAwesomeIcon icon={faUser} /> {/* Client */}
                            </label>
                        </section>
                        <div style={{marginTop:'15px'}}>{registerInput.role}</div>
                    </div>
                    {/* <div>
                    <input
                        style={{ display: 'none' }}
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleImage}
                    />
                    <label htmlFor="image" className="flip-card__btn" style={{ margin: 0 }}>
                        Upload
                    </label>
                    <br />
                    <span>{picture && picture.name}</span>
                    <div className="error-inp">{registerInput.errors.image}</div>
                </div> */}
                    <div>
                        <label htmlFor="file" className="custum-file-upload">
                            <div className="icon">
                                <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                            fill=""
                                        ></path>
                                    </g>
                                </svg>
                            </div>

                            <div className="text">
                                <span className="span-img">Click to upload image</span>
                            </div>
                            <input id="file" type="file" onChange={handleImage} />
                        </label>
                        {picture && <span>{picture.name}</span>}
                        {registerInput.errors.image && <div className="error-inp">{registerInput.errors.image}</div>}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flip-card__btn"
                >
                    {isSubmitting ? "Loading..." : "S'inscrire"}
                </button>
            </form>

        </div>
    )
}


Register.propTypes = {
    handleCheck: PropTypes.func.isRequired,
};


export default Register;