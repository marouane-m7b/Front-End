import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCommandes = createAsyncThunk(
    'commandesApi/fetchCommandes',
    async () => {
        const response = await axios.get('/api/commande');

        return response.data;
    }
);

export const getCommandeCount = createAsyncThunk(
    'commandesApi/getCommandeCount',
    async () => {
        const response = await axios.get(`/api/commande/count`);

        return response.data;
    }
);

const commandesApiSlice = createSlice({
    name: "commandesApi",
    initialState: {
        status: null,
        commandes: [],
        isLoading: false,
        editStatus: null,
        editIsLoading: false,
        getStatus: null,
        commandeCount: null,
        getIsLoading:false
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCommandes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCommandes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.commandes = action.payload.commandes
            })
            .addCase(fetchCommandes.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(getCommandeCount.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getCommandeCount.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.getStatus = action.payload.status
                state.commandeCount = action.payload.commandes
            })
            .addCase(getCommandeCount.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
    }
})

export const { changeResult } = commandesApiSlice.actions;
export default commandesApiSlice.reducer