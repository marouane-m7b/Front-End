import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProduits = createAsyncThunk(
    "produitsApi/fetchProduits",
    async () => {
        const response = await axios.get('/api/produit');
        
        return response.data;
    }
)

export const getProduitCount = createAsyncThunk(
    'produitsApi/getProduitCount',
    async () => {
        const response = await axios.get(`/api/produit/count`);

        return response.data;
    }
);

export const getCountProduitByCategorie = createAsyncThunk(
    'produitsApi/getCountProduitByCategorie',
    async (id) => {
        const response = await axios.get(`/api/categorie/${id}/produits/count`);
        
        return response.data;
    }
)

export const getProduitByCategorie = createAsyncThunk(
    'produitsApi/getProduitByCategorie',
    async (id) => {
        const response = await axios.get(`/api/categorie/${id}/produits`);
        
        return response.data;
    }
)

export const getProduit = createAsyncThunk(
    'produitsApi/getProduit',
    async (id) => {
        const response = await axios.get(`/api/produit/${id}`);

        return response.data;
    }
);

const produitsApiSlice = createSlice({
    name: "ProduitsApi",
    initialState: {
        test: null,
        status: null,
        produits: [],
        produit: {},
        produitsCategorie: [],
        isLoading: false,
        getStatus: null,
        produitCount: null,
        getIsLoading: false,
        countProduitByCategorie: null
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProduits.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProduits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.produits = action.payload.produits
            })
            .addCase(fetchProduits.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(getProduitCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduitCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.produitCount = action.payload.produits
            })
            .addCase(getProduitCount.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(getCountProduitByCategorie.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getCountProduitByCategorie.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.getStatus = action.payload.status
                state.countProduitByCategorie = action.payload.produits
            })
            .addCase(getCountProduitByCategorie.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
            .addCase(getProduitByCategorie.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getProduitByCategorie.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.getStatus = action.payload.status
                state.produitsCategorie = action.payload.produits
            })
            .addCase(getProduitByCategorie.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
            .addCase(getProduit.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getProduit.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.getStatus = action.payload.status
                state.produit = action.payload.produit
            })
            .addCase(getProduit.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
    }
})

export const { changeResult } = produitsApiSlice.actions;
export default produitsApiSlice.reducer