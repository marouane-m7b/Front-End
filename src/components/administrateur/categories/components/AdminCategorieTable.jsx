import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../../../../redux/features/categorie/categorieSlice";
import * as XLSX from "xlsx";
import { deleteCategorie } from '../../../../redux/features/categorie/categorieSlice';
import './css/form.css'
import CreateCategorie from "./CreateCategorie";
import EditCategorie from "./EditCategorie";
import SnackbarDeleteCategorie from "./SnackbarDeleteCategorie";



function AdminCategorieTable() {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    const [reload, setReload] = useState(false)
    const deleteIsLoading = useSelector((state) => state.categories.deleteIsLoading);
    const [open, setOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [updateId, setUpdateId] = useState(false)


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch, reload]);

    const handleExport = () => {
        const workBook = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(categories)

        XLSX.utils.book_append_sheet(workBook, ws, "categories")

        XLSX.writeFile(workBook, 'categories.xlsx')
    }

    const handleDelete = (id) => {
        dispatch(deleteCategorie(id));
        handleReload()
    }

    const handleReload = () => {
        setReload(!reload)
    }

    function handleOpen(bool) {
        setOpen(bool)
    }


    function handleUpdate(bool, id) {
        setUpdateId(id)
        setUpdateOpen(bool)
    }

    return (
        <>
            {open && <CreateCategorie handleOpen={handleOpen} handleReload={handleReload} />}
            {updateOpen && <EditCategorie open={updateOpen} handleUpdate={handleUpdate} handleReload={handleReload} id={+updateId} />}
            <div className="projects p-20 bg-white rad-10 m-20">
                <div className="responsive-table">
                    <table className="fs-15 w-full">
                        <thead>
                            <tr>
                                <td>Image</td>
                                <td>Nom</td>
                                <td>Description</td>
                                <td>Date de création</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {categories && categories.map((categorie) => {
                                return (
                                    <tr key={categorie.id}>
                                        <td><img src={`http://localhost:8000/${categorie.image}`} alt={categorie.nom} /></td>
                                        <td>{categorie.nom}</td>
                                        <td>{categorie.description}</td>
                                        <td>{moment(categorie.created_at).format('YYYY-MM-DD')}</td>
                                        <td style={{ minWidth: "130px", display: "flex", gap: "10px" }}>
                                            <button
                                                disabled={deleteIsLoading}
                                                onClick={() => { handleDelete(categorie.id) }}
                                                className="crud c-red">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            <button
                                                disabled={deleteIsLoading}
                                                onClick={() => { handleUpdate(true, categorie.id) }}
                                                className="crud c-blue">
                                                <i className="fa-solid fa-pen-to-square"></i>
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
            <SnackbarDeleteCategorie handleReload={handleReload} />
        </>
    )
}

export default AdminCategorieTable