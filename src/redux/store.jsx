import { configureStore } from "@reduxjs/toolkit";
import vendeurSliceReducer from "../redux/features/vendeur/vendeurSlice";
import clientVendeurSliceReducer from "./features/clientVendeur/clientVendeurSlice";
import ProduitSliceReducer from "./features/produit/ProduitSlice";
import moderateurSliceReducer from "./features/moderateur/moderateurSlice";
import categorieSliceReducer from "./features/categorie/categorieSlice";
import commandeSliceReducer from "./features/commande/commandeSlice";
import administrateurSlice from "./features/administrateur/administrateurSlice";
import autorisationsSlice from "./features/autorisation/autorisationsSlice";
import messageReducer from "./features/message/messageSlice";
import userSlice from "./features/user/userSlice";


const store = configureStore({
    reducer: {
        vendeurs: vendeurSliceReducer,
        categories: categorieSliceReducer,
        moderateurs: moderateurSliceReducer,
        administrateurs: administrateurSlice,
        clientVendeurs: clientVendeurSliceReducer,
        produits: ProduitSliceReducer,
        commandes: commandeSliceReducer,
        autorisations: autorisationsSlice,
        messages: messageReducer,
        users: userSlice
    },
})

export default store