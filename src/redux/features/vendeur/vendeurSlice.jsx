import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchVendeurs = createAsyncThunk(
    'vendeursApi/fetchVendeurs',
    async () => {
        const response = await axios.get('/api/vendeur');

        return response.data;
    }
);

export const editVendeurs = createAsyncThunk(
    'vendeursApi/editVendeurs',
    async (data) => {
        const response = await axios.put(`/api/vendeur/adminUpdate/${data.id}`, data);
        console.log(response);
        return response.data;
    }
);

export const getVendeurCount = createAsyncThunk(
    'vendeursApi/getVendeurCount',
    async () => {
        const response = await axios.get(`/api/vendeur/count`);

        return response.data;
    }
);

export const fetchUserData = createAsyncThunk(
    'vendeursApi/fetchUserData',
    async () => {
        try {
            const response = await axios.get('/api/user', {
                withCredentials: true, // Include cookies (important for Sanctum)
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
);

export const getVendeurProduit = createAsyncThunk(
    'vendeursApi/getVendeurProduit',
    async (id) => {
        const response = await axios.get(`/api/vendeur/${id}/produits`);

        return response.data;
    }
);

export const getCountVendeurProduit = createAsyncThunk(
    'vendeursApi/getCountVendeurProduit',
    async (id) => {
        const response = await axios.get(`/api/vendeur/${id}/produits/count`);

        return response.data;
    }
);

export const getVendeur = createAsyncThunk(
    'vendeursApi/getVendeur',
    async (id) => {
        const response = await axios.get(`/api/vendeur/${id}`);

        return response.data;
    }
);

const vendeursApiSlice = createSlice({
    name: "vendeursApi",
    initialState: {
        status: null,
        vendeurs: [],
        vendeur: {},
        isLoading: false,
        editStatus: null,
        editIsLoading: false,
        getStatus: null,
        vendeurCount: null,
        getIsLoading: false,
        user: null,
        produits: [],
        produit_count: 0,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchVendeurs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchVendeurs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.vendeurs = action.payload.vendeurs
            })
            .addCase(fetchVendeurs.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(editVendeurs.pending, (state) => {
                state.editIsLoading = true;
            })
            .addCase(editVendeurs.fulfilled, (state, action) => {
                state.editIsLoading = false;
                state.editStatus = action.payload.status
            })
            .addCase(editVendeurs.rejected, (state) => {
                state.editIsLoading = false;
                state.editStatus = 404
            })
            .addCase(getVendeurCount.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getVendeurCount.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.getStatus = action.payload.status
                state.vendeurCount = action.payload.vendeurs
            })
            .addCase(getVendeurCount.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
            .addCase(fetchUserData.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.user = action.payload
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
            .addCase(getVendeurProduit.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getVendeurProduit.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.produits = action.payload.produits
            })
            .addCase(getVendeurProduit.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
            .addCase(getCountVendeurProduit.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getCountVendeurProduit.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.produit_count = action.payload.produit_count;
            })
            .addCase(getCountVendeurProduit.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
            .addCase(getVendeur.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getVendeur.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.vendeur = action.payload.vendeur;
            })
            .addCase(getVendeur.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
    }
})

export const { changeResult } = vendeursApiSlice.actions;
export default vendeursApiSlice.reducer