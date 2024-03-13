import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientVendeurs } from "../../../../redux/features/clientVendeur/clientVendeurSlice";
import moment from "moment";
import * as XLSX from "xlsx";


function AdminClientVendeurTable() {


  const dispatch = useDispatch();
  const clientVendeurs = useSelector((state) => state.clientVendeurs.clientVendeurs);

  useEffect(() => {
    dispatch(fetchClientVendeurs());
  }, [dispatch]);

  const handleExport = () => {
    const workBook = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(clientVendeurs)

    XLSX.utils.book_append_sheet(workBook, ws, "clientVendeurs")

    XLSX.writeFile(workBook, 'clientVendeurs.xlsx')
}

  return (
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
              <td>Performance</td>
            </tr>
          </thead>
          <tbody>
            {clientVendeurs && clientVendeurs.map((clientVendeur) => {
              return (
                <tr key={clientVendeur.id}>
                  <td><img src={`http://localhost:8000/${clientVendeur.image}`} alt={clientVendeur.nom} /></td>
                  <td>{clientVendeur.nom_d_utilisateur}</td>
                  <td>{clientVendeur.numero_de_telephone}</td>
                  <td>{clientVendeur.email}</td>
                  <td>{clientVendeur.adresse.substring(0, 15) + "..."}</td>
                  <td>{moment(clientVendeur.created_at).format('YYYY-MM-DD')}</td>
                  <td>{clientVendeur.performance_de_ventes}%</td>
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
  )
}

export default AdminClientVendeurTable