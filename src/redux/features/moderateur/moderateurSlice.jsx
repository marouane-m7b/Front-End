import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchModerateurs = createAsyncThunk(
    'moderateursApi/fetchModerateurs',
    async () => {
        const response = await axios.get('/api/moderateur');

        return response.data;
    }
);

export const deleteModerateurs = createAsyncThunk(
    'moderateursApi/deleteModerateurs',
    async (id) => {
        const response = await axios.delete(`/api/moderateur/${id}`);

        return response.data;
    }
);

export const getModerateur = createAsyncThunk(
    'moderateursApi/getModerateur',
    async (id) => {
        const response = await axios.get(`/api/moderateur/${id}`);

        return response.data;
    }
);

export const getModerateurCount = createAsyncThunk(
    'moderateursApi/getModerateurCount',
    async () => {
        const response = await axios.get(`/api/moderateur/count`);

        return response.data;
    }
);

export const fetchUserData = createAsyncThunk(
    'moderateursApi/fetchUserData',
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

const moderateursApiSlice = createSlice({
    name: "moderateursApi",
    initialState: {
        status: null,
        moderateurs: [],
        isLoading: false,
        deleteStatus: null,
        deleteIsLoading: false,
        getStatus: null,
        moderateur: {},
        moderateurCount: null,
        getIsLoading: false,
        user: null
    },
    extraReducers(builder) {
        builder
            .addCase(fetchModerateurs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchModerateurs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.moderateurs = action.payload.moderateurs
            })
            .addCase(fetchModerateurs.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(deleteModerateurs.pending, (state) => {
                state.deleteIsLoading = true;
            })
            .addCase(deleteModerateurs.fulfilled, (state, action) => {
                state.deleteIsLoading = false;
                state.deleteStatus = action.payload.status
            })
            .addCase(deleteModerateurs.rejected, (state) => {
                state.deleteIsLoading = false;
                state.deleteStatus = 404
            })
            .addCase(getModerateur.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getModerateur.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.getStatus = action.payload.status
                state.moderateur = action.payload.moderateur
            })
            .addCase(getModerateur.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
            .addCase(getModerateurCount.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getModerateurCount.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.getStatus = action.payload.status
                state.moderateurCount = action.payload.moderateurs
            })
            .addCase(getModerateurCount.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
            .addCase(fetchUserData.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.getStatus = action.payload.status
                state.user = action.payload
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404
            })
    }
})

export const { changeResult } = moderateursApiSlice.actions;
export default moderateursApiSlice.reducer