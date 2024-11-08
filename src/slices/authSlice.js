import { createSlice } from "@reduxjs/toolkit";
import { loadUser } from "../actions/userActions";
import { logoutUser } from "../actions/userActions";
const initialState = {
  loading: true,
  isAuthenticated: false,
  otpSent: false, // To track if OTP is sent
  otpVerified: false, // To track OTP verification
  user: null, // Initialize user state
  error: null,
  message: null,
  isUpdated: false, // For tracking profile update state
  resendOtpLoading: false, // Track loading state for resend OTP
  resendOtpError: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login Actions
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false; 
      state.isAuthenticated = true; 
      state.user = action.payload.user;
      state.error = null;
    },
    loginFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    

    // Registration Actions
    registerRequest(state) {
      state.loading = true;
      state.otpSent = false; // Reset OTP state on new registration
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.otpSent = true; // OTP has been sent on successful registration
      state.user = action.payload.user; // Make sure payload.user exists
    },
    registerFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // OTP Verification Actions
    otpVerifyRequest(state) {
      state.loading = true;
      state.otpVerified = false;
    },
    otpVerifySuccess(state, action) {
      state.loading = false;
      state.otpVerified = true; // OTP verified successfully
      state.isAuthenticated = true; // Mark user as authenticated on OTP success
      state.user = action.payload.user; // Ensure action.payload.user exists
    },
    otpVerifyFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.otpVerified = false;
    },
    resendOtpRequest(state) {
        state.resendOtpLoading = true;
        state.resendOtpError = null; // Clear previous error
      },
      resendOtpSuccess(state) {
        state.resendOtpLoading = false; // Reset loading state
        state.otpSent = true; // Indicate that OTP was resent
      },
      resendOtpFail(state, action) {
        state.resendOtpLoading = false; // Reset loading state
        state.resendOtpError = action.payload; // Set error message
      },
    // Load User Actions
    loadUserRequest(state) {
      state.isAuthenticated = false;
      state.loading = true;
      state.error = null; // Clear previous error
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user; // Ensure payload.user exists
    },
    loadUserFail(state, action) {
      state.loading = false;
  // Set the error message
    },

    // Logout Actions
    logoutSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.otpSent = false; // Reset OTP state on logout
      state.otpVerified = false; // Reset OTP verification on logout
    },
    logoutFail(state, action) {
      state.error = action.payload;
    },

    // Profile Update Actions
    updateProfileRequest(state) {
      state.loading = true;
      state.isUpdated = false;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user; // Ensure payload.user exists
      state.isUpdated = true;
    },
    updateProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUpdateProfile(state) {
      state.isUpdated = false;
    },

    // Password Update Actions
    updatePasswordRequest(state) {
      state.loading = true;
      state.isUpdated = false;
    },
    updatePasswordSuccess(state) {
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Forgot Password Actions
    forgotPasswordRequest(state) {
      state.loading = true;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message; // Ensure action.payload.message exists
    },
    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset Password Actions
    resetPasswordRequest(state) {
      state.loading = true;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user; // Ensure payload.user exists
    },
    resetPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handling the logout process
    builder
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.otpSent = false; // Reset OTP state on logout
            state.otpVerified = false; // Reset OTP verification on logout
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder
        .addCase(resendOtpRequest, (state) => {
          state.resendOtpLoading = true;
          state.resendOtpError = null;
        })
        .addCase(resendOtpSuccess, (state) => {
          state.resendOtpLoading = false;
          state.otpSent = true;
        })
        .addCase(resendOtpFail, (state, action) => {
          state.resendOtpLoading = false;
          state.resendOtpError = action.payload;
        });
        

    // Other actions can go here...
},
});


// Export actions and reducer
export const {
  loginRequest,
  loginSuccess,
  loginFail,
  clearError,
  registerRequest,
  registerSuccess,
  registerFail,
  otpVerifyRequest,
  otpVerifySuccess,
  otpVerifyFail,
  logoutFail,
  logoutSuccess,
  updateProfileFail,
  updateProfileSuccess,
  updateProfileRequest,
  updatePasswordFail,
  updatePasswordSuccess,
  updatePasswordRequest,
  forgotPasswordFail,
  forgotPasswordSuccess,
  forgotPasswordRequest,
  resetPasswordFail, 
  resetPasswordRequest, 
  resetPasswordSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  clearUpdateProfile,resendOtpRequest,   // Export the resend OTP actions
  resendOtpSuccess,
  resendOtpFail,
} = authSlice.actions;

export default authSlice.reducer;
