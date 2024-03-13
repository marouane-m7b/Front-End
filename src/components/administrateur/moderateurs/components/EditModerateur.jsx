import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchCategories } from '../../../../redux/features/categorie/categorieSlice';
import { getModerateur } from '../../../../redux/features/moderateur/moderateurSlice';
import HourLoader from "../../../../miniComponents/hourLoader/HourLoader";
import PropTypes from 'prop-types';

function EditModerateur({ handleUpdate, handleReload, id }) {


  const dispatch = useDispatch()

  const moderateur = useSelector((state) => state.moderateurs.moderateur);
  const moderateurIsLoading = useSelector((state) => state.moderateurs.getIsLoading);
  const categories = useSelector((state) => state.categories.categories);
  const isLoading = useSelector((state) => state.categories.isLoading);

  useEffect(() => {
      dispatch(fetchCategories());
      dispatch(getModerateur(id));
  }, [dispatch]);


  const [registerInput, setRegisterInput] = useState({
      prenom: "",
      nom: "",
      nom_d_utilisateur: "",
      email: "",
      numero_de_telephone: "",
      adresse: "",
      date_de_naissance: "2000-01-01",
      mot_de_passe: "",
      categorie_id: "",
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

  useEffect(() => {
      if (moderateurIsLoading == false) {
          setRegisterInput({
              ...registerInput,
              prenom: moderateur.prenom,
              nom: moderateur.nom,
              nom_d_utilisateur: moderateur.nom_d_utilisateur,
              email: moderateur.email,
              numero_de_telephone: moderateur.numero_de_telephone,
              adresse: moderateur.adresse,
              date_de_naissance: moderateur.date_de_naissance,
              categorie_id: moderateur.categorie_id,
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
          });
      }
  }, [moderateurIsLoading])


  const handleInput = (e) => {
      let key = e.target.name;
      let value = e.target.value;
      setRegisterInput(prevValue => ({ ...prevValue, [key]: value }))
  }





  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData()

      formData.append('prenom', registerInput.prenom)
      formData.append('nom', registerInput.nom)
      formData.append('nom_d_utilisateur', registerInput.nom_d_utilisateur)
      formData.append('email', registerInput.email)
      formData.append('numero_de_telephone', registerInput.numero_de_telephone)
      formData.append('adresse', registerInput.adresse)
      formData.append('date_de_naissance', registerInput.date_de_naissance)
      formData.append('categorie_id', registerInput.categorie_id)


      setIsSubmitting(true)

      try {
          const res = await axios.put(`/api/moderateur/${id}`, formData, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (res.data.status === 200) {
              Swal.fire({
                  title: "Success",
                  text: res.data.message,
                  icon: "success"
              });
              handleUpdate(false)
              handleReload()
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
    <div className='add_form'>
      {/* <form className="form">
        <span className="title">Ajouter un modérateur</span>
        <input id="file" type="file" />
        <label className="avatar" htmlFor="file"><span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M17.1813 16.3254L15.3771 14.5213C16.5036 13.5082 17.379 12.9869 18.2001 12.8846C19.0101 12.7837 19.8249 13.0848 20.8482 13.8687C20.8935 13.9034 20.947 13.9202 21 13.9202V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V13.7522C3.06398 13.7522 3.12796 13.7278 3.17678 13.679L4.45336 12.4024C5.31928 11.5365 6.04969 10.8993 6.71002 10.4791C7.3679 10.0605 7.94297 9.86572 8.50225 9.86572C9.06154 9.86572 9.6366 10.0605 10.2945 10.4791C10.9548 10.8993 11.6852 11.5365 12.5511 12.4024L16.8277 16.679C16.9254 16.7766 17.0836 16.7766 17.1813 16.679C17.2789 16.5813 17.2789 16.423 17.1813 16.3254Z" opacity="0.1"></path> <path strokeWidth="2" stroke="#ffffff" d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"></path> <path strokeLinecap="round" strokeWidth="2" stroke="#ffffff" d="M17.0045 16.5022L12.7279 12.2256C9.24808 8.74578 7.75642 8.74578 4.27658 12.2256L3 13.5022"></path> <path strokeLinecap="round" strokeWidth="2" stroke="#ffffff" d="M21.0002 13.6702C18.907 12.0667 17.478 12.2919 15.1982 14.3459"></path> <path strokeWidth="2" stroke="#ffffff" d="M17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8Z"></path> </g></svg></span></label>
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className='button'>Register</button>
        <button className='close-btn' onClick={() => handleOpen(false)}><i className="far fa-times-circle"></i></button>
      </form> */}
      <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <span className="title">Modifier un modérateur</span>

        <div className='d-flex f-wrap gap-20'>
          <div>
            <input
              onChange={handleInput}
              value={registerInput.prenom}
              name="prenom"
              placeholder="Prénom"
            />
            <span className='error'>{registerInput.errors.prenom}</span>
          </div>
          <div>
            <input
              onChange={handleInput}
              value={registerInput.nom}
              placeholder="Nom"
              name="nom"
            />
            <span className='error'>{registerInput.errors.nom}</span>
          </div>
          <div>
            <input
              onChange={handleInput}
              value={registerInput.nom_d_utilisateur}
              placeholder="Nom d'utilisateur"
              name="nom_d_utilisateur"
            />
            <span className='error'>{registerInput.errors.nom_d_utilisateur}</span>
          </div>
        </div>
        <div className='d-flex f-wrap gap-20'>
          <div>
            <input
              onChange={handleInput}
              value={registerInput.email}
              placeholder="Email"
              name="email"
            />
            <span className='error'>{registerInput.errors.email}</span>
          </div>
          <div>
            <input
              onChange={handleInput}
              value={registerInput.numero_de_telephone}
              placeholder="Numéro de téléphone"
              name="numero_de_telephone"
            />
            <span className='error'>{registerInput.errors.numero_de_telephone}</span>
          </div>
        </div>
        <input
          onChange={handleInput}
          value={registerInput.adresse}
          placeholder="Addresse"
          name="adresse"
        />
        <span className='error'>{registerInput.errors.adresse}</span>
        <div className='d-flex f-wrap gap-20'>
          <div>
            <input
              onChange={handleInput}
              value={registerInput.date_de_naissance}
              placeholder="Birth Date"
              name="date_de_naissance"
              type='date'
            />
            <span className='error'>{registerInput.errors.date_de_naissance}</span>
          </div>
          <div>
            <input
              onChange={handleInput}
              value={registerInput.mot_de_passe}
              name="mot_de_passe"
              placeholder="Mot de passe"
              type="password"
            />
            <span className='error'>{registerInput.errors.mot_de_passe}</span>
          </div>
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <div>
              <select
                name="categorie_id"
                value={registerInput.categorie_id}
                placeholder="Categorie"
                onChange={handleInput}
              >
                {categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.nom}
                  </option>
                ))}
              </select><br />
              <span className='error'>{registerInput.errors.categorie_id}</span>
            </div>)}
        </div>
        <button className='button' disabled={isSubmitting} >
          {isSubmitting ? <HourLoader /> : "Modifier"}
        </button>
        <button className='close-btn' onClick={() => handleUpdate(false)}><i className="far fa-times-circle"></i></button>
      </form>
    </div >
  )
}


EditModerateur.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
};

export default EditModerateur

