import axios from 'axios';
import {isEmpty} from 'lodash';
import { BASE_URI_POS, TOKEN } from '../commos/keys';


const API = axios.create({
  baseURL: BASE_URI_POS,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Authorization: TOKEN,
  },
});

API.interceptors.request.use(
  async config => {
    let token = TOKEN;
    if (token) config.headers['Authorization'] = token;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// API.interceptors.response.use(
//   response => {
//     if (response.status != 200 && response.status != 201) {
//       throw new Error(`Error código: ${response.data.message}`);
//     }
//     return response;
//   },
//   error => {
//     //  console.log('ok', JSON.stringify( error));
//     // if (error.response === undefined) {
//     //   throw new Error(
//     //     `No se puede conectar al API, no tiene acceso a internet`,
//     //   );
//     // }
//     if (
//       error.response === undefined ||
//       isEmpty(error.response.data) ||
//       !error.response.data.statusCode
//     ) {
//       throw new Error(
//         `No se puede conectar al API, no tiene acceso a internet`,
//       );
//     }

//     if (
//       error.response.data.statusCode === 403 ||
//       error.response.data.statusCode === 401
//     ) {
    
//       console.log('se expoiró el token');
//       throw new Error(`${error.response.data.message}`);
//     }

//     if (error.response.data.statusCode !== 200) {
//       throw new Error(`${error.response.data.message}`);
//     }
//   },
// );

export {API};
