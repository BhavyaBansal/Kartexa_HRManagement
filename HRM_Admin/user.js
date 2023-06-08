import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const API_BASE_URL = 'http://10.0.2.2:3000/api';
export const signIn = async (email, password) => {
  try {
    const signInres = axios.post(`${API_BASE_URL}/auth/signin/`, {
      email,
      password,
    });
    if (signInres.data.success) {
      const token = data.token;
      await AsyncStorage.setItem('token', token);
    }
    return signInres;
  } catch (error) {
    console.log('Error inside signin method', error.message);
  }
};
