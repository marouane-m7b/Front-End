import { useState } from "react";
import { useDispatch } from "react-redux";

const CreateProduit = ({ open, handleOpen, handleReload }) => {
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

    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [picture, setPicture] = useState('')
    // fonction
    const handleImage = (e) => {
        setPicture(e.target.files[0]);
    };
    const handleInput = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setRegisterInput(prevValue => ({ ...prevValue, [key]: value }))
    }
    // 	
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData()

        formData.append('vendeur_id', picture);
        formData.append('categorie_id', picture);
        formData.append('nom', picture);
        formData.append('prix', picture);
        formData.append('fabricant', picture);
        formData.append('quantite', picture);
        formData.append('poids', picture);
        formData.append('description', picture);
        formData.append('duree_de_la_garantie', picture);
        formData.append('image', picture);

        setIsSubmitting(true)
        try {
            const res = await axios.post(`/api/categorie`, formData, {
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
                handleOpen(false)
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
    // return 
}

export default CreateProduit;