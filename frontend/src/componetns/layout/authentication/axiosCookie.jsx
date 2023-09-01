import axios from 'axios';


async function getAccessToken() {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/getToken");
    const token = response;
    console.log('Token:', token);
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}

export default getAccessToken;
