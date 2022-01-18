import Axios from 'axios';

export default async function products() {
  try {
    const response = await Axios.get(`${process.env.REACT_APP_API_ENDPOINT}`);
    return response.data;
  } catch (error) {
    return [];
  }
}
