// src/slices/razorpaySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to get the API key
export const getApiKey = createAsyncThunk(
    'razorpay/getApiKey',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the request
                },
            };
            const response = await axios.get('/api/v1/razorpayapi', config); // Fetch API key
            return response.data.razorpayApiKey; // Return API key
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch API key');
        }
    }
);

const initialState = {
    loading: false,
    apiKey: null,
    error: null,
};

const razorpaySlice = createSlice({
    name: 'razorpay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getApiKey.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear any previous errors
            })
            .addCase(getApiKey.fulfilled, (state, action) => {
                state.loading = false;
                state.apiKey = action.payload; // Save API key here
            })
            .addCase(getApiKey.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Save error message
            });
    },
});

export default razorpaySlice.reducer;
