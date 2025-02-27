import axios from "axios";

const API_BASE_URL = "https://www.qoyn.network/api"; // Replace with your actual API URL

// Passphrase Sign-In API
export const signInWithPassphrase = async (passphrase) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/passphrase/signin`, { passphrase });
    console.log(response.data,"dfsdf")

    return response.data;
    
  } catch (error) {
    console.log(error)
    throw error.response ? error.response.data : { error: "Server error" };
  }
};
export const signUp = async (passphrase) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      passphrase,
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error("SignUp API Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Sign-up failed" };
  }
};
