import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCategories = createAsyncThunk(
    "categoriesApi/fetchCategories",
    async () => {
        const response = await axios.get('/api/categorie');

        return response.data;
    }
)

export const deleteCategorie = createAsyncThunk(
    'categoriesApi/deleteCategories',
    async (id) => {
        const response = await axios.delete(`/api/categorie/${id}`);

        return response.data;
    }
);

export const getCategorie = createAsyncThunk(
    'categoriesApi/getCategorie',
    async (id) => {
        const response = await axios.get(`/api/categorie/${id}`);

        return response.data;
    }
);

export const getCategorieCount = createAsyncThunk(
    'categoriesApi/getCategorieCount',
    async () => {
        const response = await axios.get(`/api/categorie/count`);

        return response.data;
    }
);

const categoriesApiSlice = createSlice({
    name: "CategoriesApi",
    initialState: {
        test: null,
        deleteStatus: null,
        status: null,
        categories: [],
        categorie: {},
        categorieCount: null,
        isLoading: false,
        deleteIsLoading: false,
        getIsLoading: false,
        getStatus: null,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.categories = action.payload.categories
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })
            .addCase(deleteCategorie.pending, (state) => {
                state.deleteIsLoading = true;
            })
            .addCase(deleteCategorie.fulfilled, (state, action) => {
                state.deleteIsLoading = false;
                state.deleteStatus = action.payload.status
            })
            .addCase(deleteCategorie.rejected, (state) => {
                state.deleteIsLoading = false;
                state.deleteStatus = 404
            })
            .addCase(getCategorie.pending, (state) => {
                state.getIsLoading = true;
            })
            .addCase(getCategorie.fulfilled, (state, action) => {
                state.getIsLoading = false;
                state.getStatus = action.payload.status;
                state.categorie = action.payload.categorie;
            })
            .addCase(getCategorie.rejected, (state) => {
                state.getIsLoading = false;
                state.getStatus = 404;
            })
            .addCase(getCategorieCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategorieCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status
                state.categorieCount = action.payload.categories
            })
            .addCase(getCategorieCount.rejected, (state) => {
                state.isLoading = false;
                state.status = 404
            })

    }
})

export const { changeResult } = categoriesApiSlice.actions;
export default categoriesApiSlice.reducer

export const getCategorieLoading = (state) => state.categories.getIsLoading;

// artiquey query