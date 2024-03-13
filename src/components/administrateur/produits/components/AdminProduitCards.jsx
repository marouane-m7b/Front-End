import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduits } from "../../../../redux/features/produit/ProduitSlice";
import Produit from "./Produit";
import * as XLSX from "xlsx";


function AdminProduitCards() {


  const dispatch = useDispatch();
  const produits = useSelector((state) => state.produits.produits);

  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);

  const handleExport = () => {
    const workBook = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(produits)

    XLSX.utils.book_append_sheet(workBook, ws, "produits")

    XLSX.writeFile(workBook, 'produits.xlsx')
}

  return (
    <div className="d-flex gap-20 f-wrap space-evenly">
      {produits.map((produit, index) => (
        <Produit key={index} produitData={produit} />
      ))}
      <div className="btn-fixed">
          <button onClick={handleExport}>Export</button>
      </div>
    </div>
  )
}

export default AdminProduitCards