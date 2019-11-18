import axios from 'axios';

const baseAxios = axios.create({
    //agregar la url de chesus servidor
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  //cuando funcione mi login token cambiarlo a true y mandarlo como autorization
  withCredentials: false,
});

export default baseAxios;