import axios from "axios";

const API_BASE_URL = "https://your-api.com/api"; // Replace with your actual API URL

// Generate Passphrase API
export const generatePassphrase = async (language = "en") => {
  try {
    const response = await axios.get(`${API_BASE_URL}/generate-passphrase`, {
      params: { language },
    });

    return response.data.passphrase; // Expecting an array of words
  } catch (error) {
    console.error("Passphrase Generation Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Failed to generate passphrase" };
  }
};

// Sign-Up API
export const signUp = async (passphrase) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      passphrase,
    });

    return response.data; // Return response data
  } catch (error) {
    console.error("Sign-Up API Error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Sign-up failed" };
  }
};
