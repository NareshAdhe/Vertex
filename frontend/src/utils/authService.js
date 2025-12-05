import api from './api'

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  // Verify OTP
  verifyOTP: async (userId, otp) => {
    const response = await api.post('/auth/verify', { userId, otp })
    return response.data
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await api.post(`/auth/reset-password/${token}`, { password })
    return response.data
  },

  // Resend OTP
  resendOTP: async (userId) => {
    const response = await api.post('/auth/resend-otp', { userId })
    return response.data
  },

    // Admin: Get all users
  getAllUsers: async () => {
    const response = await api.get('/auth/admin/users');
    return response.data;
  },

  // Admin: Update user role
  updateUserRole: async (userId, role) => {
    const response = await api.put(`/auth/admin/users/${userId}/role`, { role });
    return response.data;
  },

  // Admin: Delete user
  deleteUser: async (userId) => {
    const response = await api.delete(`/auth/admin/users/${userId}`);
    return response.data;
  },
};
