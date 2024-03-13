import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const showMessageParClientVendeur = createAsyncThunk(
    'messagesApi/showMessageParClientVendeur',
    async (id) => {
        const response = await axios.get(`/api/message/vendeur/${id}`);

        return response.data;
    }
);

export const showMessageParVendeur = createAsyncThunk(
    'messagesApi/showMessageParVendeur',
    async (id) => {
        const response = await axios.get(`/api/message/client_vendeur/${id}`);

        return response.data;
    }
);

const messagesApiSlice = createSlice({
    name: "messagesApi",
    initialState: {
        status: null,
        messages: [],
        isMsgClientVendeurLoading: false,
        isMsgVendeurLoading: false,
    },
    extraReducers(builder) {
        builder
            .addCase(showMessageParClientVendeur.pending, (state) => {
                state.isMsgClientVendeurLoading = true;
            })
            .addCase(showMessageParClientVendeur.fulfilled, (state, action) => {
                state.isMsgClientVendeurLoading = false;
                state.status = action.payload.status
                state.messages = action.payload.message
            })
            .addCase(showMessageParClientVendeur.rejected, (state) => {
                state.isMsgClientVendeurLoading = false;
                state.status = 404
            })
            .addCase(showMessageParVendeur.pending, (state) => {
                state.isMsgVendeurLoading = true;
            })
            .addCase(showMessageParVendeur.fulfilled, (state, action) => {
                state.isMsgVendeurLoading = false;
                state.status = action.payload.status
                state.messages = action.payload.message
            })
            .addCase(showMessageParVendeur.rejected, (state) => {
                state.isMsgVendeurLoading = false;
                state.status = 404
            })
    }
})


export const { changeResult } = messagesApiSlice.actions;
export default messagesApiSlice.reducer