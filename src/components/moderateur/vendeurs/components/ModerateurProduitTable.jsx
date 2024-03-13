import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import Toggle from "./toggle/Toggle";
// import Alert from "../../../../miniComponents/alert/Alert";
import * as XLSX from "xlsx";
import { fetchUserData } from "../../../../redux/features/moderateur/moderateurSlice";
import { getProduitByCategorie } from "../../../../redux/features/produit/ProduitSlice";




function ModerateurProduitTable() {

  const dispatch = useDispatch();

  const idModerateur = useSelector((state) => state.moderateurs.user?.categorie_id);
  const produits = useSelector((state) => state.produits.produitsCategorie);


  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch]);

  useEffect(() => {
    if (idModerateur) {
      dispatch(getProduitByCategorie(idModerateur))
    }
  }, [dispatch, idModerateur]);




  const handleExport = () => {
    const workBook = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(produits)

    XLSX.utils.book_append_sheet(workBook, ws, "produits")

    XLSX.writeFile(workBook, 'produits.xlsx')
  }

  return (
    <>
      <div className="projects p-20 bg-white rad-10 m-20">
        <div className="responsive-table">
          <table className="fs-15 w-full">
            <thead>
              <tr>
                <td>Image</td>
                <td>Fabricant</td>
                <td>Quantite</td>
                <td>Prix</td>
                <td>Description</td>
                <td>Poids</td>
                <td>Date de création</td>
                {/* <td>Active</td> */}
              </tr>
            </thead>
            <tbody>
              {produits && produits.map((produit) => {
                return (
                  <tr key={produit.id}>
                    <td><img src={`http://localhost:8000/${produit.image}`} alt={produit.nom} /></td>
                    <td>{produit.fabricant}</td>
                    <td>{produit.quantite}</td>
                    <td>{produit.prix}</td>
                    <td>{produit.description.substring(0, 15) + "..."}</td>
                    <td>{produit.poids}</td>
                    <td>{moment(produit.created_at).format('YYYY-MM-DD')}</td>
                    {/* <td>
                      <Toggle handleClick={handleClick} produit={produit} check={produit.isActive} disable={isLoading || editIsLoading} />
                    </td> */}
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
      {/* <Alert status={isSucces} content="La modification est faite avec succes" /> */}
    </>
  )
}

export default ModerateurProduitTable