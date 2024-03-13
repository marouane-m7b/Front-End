import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
    'users/fetchUserData',
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

const usersSlice = createSlice({
    name: "users",
    initialState: {
        status: null,
        getIsLoading: false,
        isLoading: false,
        getStatus: null,
        user: {},
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
})

export const { changeResult } = usersSlice.actions;
export default usersSlice.reducer