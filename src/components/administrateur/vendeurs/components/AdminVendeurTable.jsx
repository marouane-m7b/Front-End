import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendeurs } from '../../../../redux/features/vendeur/vendeurSlice';
import moment from "moment";
import { editVendeurs } from '../../../../redux/features/vendeur/vendeurSlice';
import Toggle from "./toggle/Toggle";
import Alert from "../../../../miniComponents/alert/Alert";
import * as XLSX from "xlsx";



function AdminVendeurTable() {


  const dispatch = useDispatch();
  const vendeurs = useSelector((state) => state.vendeurs.vendeurs);
  const editIsLoading = useSelector((state) => state.vendeurs.editIsLoading);
  const editStatus = useSelector((state) => state.vendeurs.editStatus);
  const isLoading = useSelector((state) => state.vendeurs.isLoading);
  const [isSucces, setIsSucces] = useState(false)

  const handleDeleteFulfilled = (dispatch, status) => {
    dispatch(editVendeurs.fulfilled(status));
    setTimeout(() => {
      dispatch(editVendeurs.resetStatus());
    }, 3001);
  };

  useEffect(() => {
    if (editStatus === 200) {
      setIsSucces(true)
      setTimeout(() => {
        setIsSucces(false)
      }, 3001)
      handleDeleteFulfilled(dispatch, editStatus)
    }
  }, [editStatus, setIsSucces, dispatch])


  const handleClick = async (params) => {
    dispatch(editVendeurs(params));
  }

  useEffect(() => {
    dispatch(fetchVendeurs());
  }, [dispatch, editIsLoading]);

  const handleExport = () => {
    const workBook = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(vendeurs)

    XLSX.utils.book_append_sheet(workBook, ws, "vendeurs")

    XLSX.writeFile(workBook, 'vendeurs.xlsx')
}

  return (
    <>
      <div className="projects p-20 bg-white rad-10 m-20">
        <div className="responsive-table">
          <table className="fs-15 w-full">
            <thead>
              <tr>
                <td>Image</td>
                <td>Nom d&apos;utilisateur</td>
                <td>Numéro de téléphone</td>
                <td>Email</td>
                <td>Adresse</td>
                <td>Date de création</td>
                <td>Active</td>
              </tr>
            </thead>
            <tbody>
              {vendeurs && vendeurs.map((vendeur) => {
                return (
                  <tr key={vendeur.id}>
                    <td><img src={`http://ofpptecomtest.infinityfreeapp.com/${vendeur.image}`} alt={vendeur.nom} /></td>
                    <td>{vendeur.nom_d_utilisateur}</td>
                    <td>{vendeur.numero_de_telephone}</td>
                    <td>{vendeur.email}</td>
                    <td>{vendeur.adresse.substring(0, 15) + "..."}</td>
                    <td>{moment(vendeur.created_at).format('YYYY-MM-DD')}</td>
                    <td>
                      <Toggle handleClick={handleClick} vendeur={vendeur} check={vendeur.isActive} disable={isLoading || editIsLoading} />
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
        <div className="btn-fixed">
          <button onClick={handleExport}>Export</button>
        </div>
      </div>
      <Alert status={isSucces} content="La modification est faite avec succes" />
    </>
  )
}

export default AdminVendeurTable