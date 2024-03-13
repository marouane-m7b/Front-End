import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getCategorieLoading, getCategorie } from "../../../../redux/features/categorie/categorieSlice";
import HourLoader from "../../../../miniComponents/hourLoader/HourLoader";
import PropTypes from 'prop-types';

function EditCategorie({ handleUpdate, handleReload, id }) {


  const dispatch = useDispatch()

  const categorieIsLoading = useSelector(getCategorieLoading); // hadi

  const categorie = useSelector((state) => state.categories.categorie);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getCategorie(id));
  }, [dispatch]);


  const [registerInput, setRegisterInput] = useState({
    nom: "",
    description: "",
    image: "",
    errors: {
      nom: "",
      description: "",
      image: "",
    }
  });

  useEffect(() => {
    if (categorieIsLoading == false) {
      setRegisterInput({
        ...registerInput,
        nom: categorie.nom ?? '',
        description: categorie.description ?? '',
        errors: {
          nom: "",
          description: "",
        }
      });
    }
  }, [categorieIsLoading]);


  const handleInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setRegisterInput(prevValue => ({ ...prevValue, [key]: value }));

  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('nom', registerInput.nom);
    formData.append('description', registerInput.description);

    setIsSubmitting(true);

    try {
      const res = await axios.put(`/api/categorie/${id}`, formData, {
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
        handleReload(false) // mn ba3d
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
      <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <span className="title">Ajouter un modérateur</span>
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
            value={registerInput.description}
            placeholder="Description"
            name="description"
          />
          <span className='error'>{registerInput.errors.description}</span>
        </div>
        <button className='button' disabled={isSubmitting} >
          {isSubmitting ? <HourLoader /> : "Créer"}
        </button>
        <button className='close-btn' onClick={() => handleUpdate(false)}><i className="far fa-times-circle"></i></button>
      </form>
    </div >
  )
}


EditCategorie.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
};

export default EditCategorie

