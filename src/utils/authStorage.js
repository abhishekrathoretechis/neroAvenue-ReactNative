import AsyncStorage from '@react-native-async-storage/async-storage'

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await AsyncStorage.setItem(key, authToken);
  } catch (err) {
    console.log("Error storing the auth", err);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    console.log("Error getting the auth token", err);
  }
};

const removeToken = async () => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log("Error removing the auth token", err);
  }
};

export default { getToken, storeToken, removeToken };