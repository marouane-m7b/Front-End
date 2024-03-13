import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchModerateurs } from '../../../../redux/features/moderateur/moderateurSlice';
import * as XLSX from "xlsx";
import { deleteModerateurs } from "../../../../redux/features/moderateur/moderateurSlice";
import axios from "axios";
import Swal from "sweetalert2";
import CreateModerateur from "./CreateModerateur";
import './css/form.css'
import EditModerateur from "./EditModerateur";
import SnackbarDeleteModerateur from "./SnackbarDeleteModerateur";



function AdminModerateurTable() {

    const dispatch = useDispatch();
    const moderateurs = useSelector((state) => state.moderateurs.moderateurs);
    const [reload, setReload] = useState(false)
    const deleteIsLoading = useSelector((state) => state.moderateurs.deleteIsLoading);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [updateId, setUpdateId] = useState(false)


    useEffect(() => {
        dispatch(fetchModerateurs());
    }, [dispatch, reload]);

    const handleDelete = (id) => {
        dispatch(deleteModerateurs(id));
        handleReload()
    }

    const handleReload = () => {
        setReload(!reload)
    }

    function handleOpen(bool) {
        setOpen(bool)
    }

    const handleReset = async (id) => {

        setIsSubmitting(true);

        function generateRandomPassword(length) {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";
            let password = "";

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset.charAt(randomIndex);
            }

            return password;
        }

        const password = generateRandomPassword(12);

        const formData = new FormData()

        formData.append('mot_de_passe', password)

        try {
            const res = await axios.put(`/api/moderateur/reset/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.data.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Nouveau mot de passe: " + res.data.mot_de_passe,
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: res.data.message,
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error during registration", error);
        } finally {
            setIsSubmitting(false)
        }

        handleReload()
    };

    function handleUpdate(bool, id) {
        setUpdateId(id)
        setUpdateOpen(bool)
    }



    const handleExport = () => {
        const workBook = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(moderateurs)

        XLSX.utils.book_append_sheet(workBook, ws, "moderateurs")

        XLSX.writeFile(workBook, 'moderateurs.xlsx')
    }

    return (
        <>
            {open && <CreateModerateur handleOpen={handleOpen} handleReload={handleReload} />}
            {updateOpen && <EditModerateur open={updateOpen} handleUpdate={handleUpdate} handleReload={handleReload} id={+updateId} />}
            <div className="projects p-20 bg-white rad-10 m-20">
                <div className="responsive-table">
                    <table className="fs-15 w-full">
                        <thead>
                            <tr>
                                <td>Image</td>
                                <td>Nom d&apos;utilisateur</td>
                                <td>Categorie</td>
                                <td>Email</td>
                                <td>Adresse</td>
                                <td>Date de création</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {moderateurs && moderateurs.map((moderateur) => {
                                return (
                                    <tr key={moderateur.id}>
                                        <td><img src={`http://ofpptecomtest.infinityfreeapp.com/${moderateur.image}`} alt={moderateur.nom} /></td>
                                        <td>{moderateur.nom_d_utilisateur}</td>
                                        <td>{moderateur.categorie && moderateur.categorie.nom}</td>
                                        <td>{moderateur.email}</td>
                                        <td>{moderateur.adresse.substring(0, 15) + "..."}</td>
                                        <td>{moment(moderateur.created_at).format('YYYY-MM-DD')}</td>
                                        <td style={{ minWidth: "130px", display: "flex", gap: "10px" }}>
                                            <button
                                                disabled={deleteIsLoading || isSubmitting}
                                                onClick={() => { handleDelete(moderateur.id) }}
                                                className="crud c-red">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            <button
                                                disabled={deleteIsLoading || isSubmitting}
                                                onClick={() => { handleUpdate(true, moderateur.id) }}
                                                className="crud c-blue">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button
                                                disabled={deleteIsLoading || isSubmitting}
                                                onClick={() => { handleReset(moderateur.id) }}
                                                className="crud c-green">
                                                <i className="fa-solid fa-rotate"> </i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                <div className="btn-fixed">
                    <button onClick={() => handleOpen(true)}>Créer</button>
                    <button onClick={handleExport}>Export</button>
                </div>
            </div>
            <SnackbarDeleteModerateur handleReload={handleReload} />
        </>
    )
}

export default AdminModerateurTable