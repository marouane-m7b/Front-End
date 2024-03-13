import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
    'administrateursApi/fetchUserData',
    async () => {
        try {
            const response = await axios.get('/api/user', {
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
);

const administrateursApiSlice = createSlice({
    name: "administrateursApi",
    initialState: {
        status: null,
        isLoading: false,
        getStatus: null,
        getIsLoading: false,
        user: null
    },
    extraReducers(builder) {
        builder
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
});

export const { changeResult } = administrateursApiSlice.actions;
export default administrateursApiSlice.reducer