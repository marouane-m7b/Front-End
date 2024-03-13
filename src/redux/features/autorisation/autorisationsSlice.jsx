import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAutorisations = createAsyncThunk(
    'autorisationsApi/fetchAutorisations',
    async () => {
        const response = await axios.get('/api/autorisation');

        return response.data;
    }
);
export const getAutorisations = createAsyncThunk(
    'autorisationsApi/getAutorisations',
    async (id) => {
        const response = await axios.get(`/api/autorisation/${id}`);

        return response.data;
    }
);

const vendeursApiSlice = createSlice({
    name: "vendeursApi",
    initialState: {
        status: null,
        autorisations: [],
        autorisation: {},
        isLoading: false,
        getStatus: null,
        getIsLoading: false,
        user: null,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAutorisations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAutorisations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.autorisations = action.payload.autorisations
            })
            .addCase(fetchAutorisations.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(getAutorisations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAutorisations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.autorisation = action.payload.autorisation
            })
            .addCase(getAutorisations.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
    }
})

export const { changeResult } = vendeursApiSlice.actions;
export default vendeursApiSlice.reducer