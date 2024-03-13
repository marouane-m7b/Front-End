import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchClientVendeurs = createAsyncThunk(
    "clientVendeursApi/fetchClientVendeurs",
    async () => {
        const response = await axios.get('/api/client_vendeur');

        return response.data;
    }
)

export const getClientVendeurCount = createAsyncThunk(
    'clientVendeursApi/getClientVendeurCount',
    async () => {
        const response = await axios.get(`/api/client_vendeur/count`);

        return response.data;
    }
);

export const fetchUserData = createAsyncThunk(
    'clientVendeursApi/fetchUserData',
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

export const getClientVendeur = createAsyncThunk(
    'clientVendeursApi/getClientVendeur',
    async (id) => {
        const response = await axios.get(`/api/client_vendeur/${id}`);
        
        return response.data;
    }
);

export const getCountAutorisation = createAsyncThunk(
    'clientVendeursApi/getCountAutorisation',
    async (id) => {
        const response = await axios.get(`/api/autorisation/${id}/count`);
        
        return response.data;
    }
);

export const getAutorisationsExist = createAsyncThunk(
    'clientVendeursApi/getAutorisationsExist',
    async (idVendeur) => {
        const responseUser = await axios.get('/api/user', {
            withCredentials: true, // Include cookies (important for Sanctum)
        });
        
        const response = await axios.get(`/api/client_vendeur/${responseUser.data.id}/${idVendeur}`);
        
        // console.log({slice: response.data, idVendeur});
        return response.data;
    }
);

export const getVendeurWithClientVendeur = createAsyncThunk(
    'clientVendeursApi/getVendeurWithClientVendeur',
    async (id) => {
        const response = await axios.get(`/api/client_vendeur/${id}/vendeurs`);
        
        return response.data;
    }
)

const clientVendeursApiSlice = createSlice({
    name: "ClientVendeursApi",
    initialState: {
        test: null,
        status: null,
        clientVendeurs: [],
        clientVendeur: {},
        autorisationExist: false,
        autorisationCount: null,
        isLoading: false,
        getStatus: null,
        clientVendeurCount: null,
        getIsLoading: false,
        user: null,
        vendeurs: []
    },
    extraReducers(builder) {
        builder
            .addCase(fetchClientVendeurs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchClientVendeurs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.clientVendeurs = action.payload['Client Vendeurs']
            })
            .addCase(fetchClientVendeurs.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(getClientVendeur.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getClientVendeur.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.clientVendeur = action.payload.client
            })
            .addCase(getClientVendeur.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(getClientVendeurCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getClientVendeurCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.clientVendeurCount = action.payload.client_vendeurs
            })
            .addCase(getClientVendeurCount.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.user = action.payload
            })
            .addCase(fetchUserData.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(getCountAutorisation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCountAutorisation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.autorisationCount = action.payload.autorisation
            })
            .addCase(getCountAutorisation.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(getAutorisationsExist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAutorisationsExist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.autorisationExist = action.payload.autorisationExists
            })
            .addCase(getAutorisationsExist.rejected, (state) => {
                console.log('la');
                state.isLoading = false;
                state.status = 404
            })
            .addCase(getVendeurWithClientVendeur.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVendeurWithClientVendeur.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.vendeurs = action.payload.vendeurs
            })
            .addCase(getVendeurWithClientVendeur.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
    }
})


export const { changeResult } = clientVendeursApiSlice.actions;
export default clientVendeursApiSlice.reducer