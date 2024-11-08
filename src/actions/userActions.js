import axios from "axios";
import {
    loginFail,
    loginRequest,
    loginSuccess,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileFail,
    updateProfileSuccess,
    updateProfileRequest,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    otpVerifyRequest,
    otpVerifySuccess,
    otpVerifyFail,
    otpSentSuccess,
    otpSentFail,
    resendOtpSuccess,
    resendOtpFail
} from "../slices/authSlice";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    deleteUserFail,
    deleteUserRequest,
    deleteUserSuccess,
    updateUserFail,
    updateUserRequest,
    updateUserSuccess,
    userFail,
    userRequest,
    usersFail,
    usersRequest,
    usersSuccess,
    userSuccess
} from "../slices/userSlice";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await axios.post(`api/v1/login`, { email, password });
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response.data.message));
    }
};

export const clearAuthError = () => (dispatch) => {
    dispatch(clearError());
};

export const register = (formData) => async (dispatch) => { // Adjusted to accept formData
    try {
        dispatch(registerRequest());
        const response = await axios.post('/api/v1/register', formData); // Adjust URL as necessary
        dispatch(registerSuccess(response.data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration failed";
        dispatch(registerFail(errorMessage));
    }
};

// Define the async action
export const loadUser = createAsyncThunk('user/loadUser', async (_, { dispatch }) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get('/api/v1/myprofile');
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
        throw error; // Re-throw the error to be caught in extraReducers
    }
}); 

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    const response = await axios.get('/api/v1/logout'); // Adjust the URL as needed
    return response.data; // Return the response data
});
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        };
        const { data } = await axios.put(`/api/v1/update`, userData, config);
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message));
    }
};

export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        await axios.put(`/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess());
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message));
    }
};

export const forgotPassword = (formData) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        const { data } = await axios.post(`/api/v1/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data));
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message));
    }
};

export const resetPassword = (formData, token) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        const { data } = await axios.post(`/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data));
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message));
    }
};

export const getUsers = async (dispatch) => {
    try {
        dispatch(usersRequest());
        const { data } = await axios.get(`/api/v1/admin/users`);
        dispatch(usersSuccess(data));
    } catch (error) {
        dispatch(usersFail(error.response.data.message));
    }
};

export const getUser = id => async (dispatch) => {
    try {
        dispatch(userRequest());
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data));
    } catch (error) {
        dispatch(userFail(error.response.data.message));
    }
};

export const deleteUser = id => async (dispatch) => {
    try {
        dispatch(deleteUserRequest());
        await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess());
    } catch (error) {
        dispatch(deleteUserFail(error.response.data.message));
    }
};

export const updateUser = (id, formData) => async (dispatch) => {
    try {
        dispatch(updateUserRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        await axios.put(`/api/v1/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess());
    } catch (error) {
        dispatch(updateUserFail(error.response.data.message));
    }
};

export const verifyOTP = (email, otp) => async (dispatch) => {
    try {
        dispatch(otpVerifyRequest());
        // Make sure to send email and otp as expected by your backend
        const response = await axios.post('/api/v1/otp-verify', { email, otp });
        dispatch(otpVerifySuccess(response.data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || "OTP verification failed";
        dispatch(otpVerifyFail(errorMessage));
    }
};
// Resend OTP action
export const resendOtp = (email) => async (dispatch) => {
    try {
        dispatch(resendOtpSuccess()); // Dispatch success action to indicate OTP is being sent
        const response = await axios.post('/api/v1/otp-resent', { email }); // Adjust the URL if necessary
        dispatch(resendOtpSuccess(response.data)); // Dispatch success with response data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Resending OTP failed";
        dispatch(resendOtpFail(errorMessage)); // Dispatch failure action with the error message
    }
};

