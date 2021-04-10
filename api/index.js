import axios from 'axios';
import _ from 'lodash';
import {Platform} from 'react-native';

let authToken = null;
const setAuthToken = (token) => {
  authToken = token;
};

const create = () => {
  const api = axios.create({
    baseURL: 'https://0vd92.sse.codesandbox.io/',
    timeout: 60000, // 1p
  });

  api.interceptors.request.use((request) => {
    // console.log('Starting Request', request);
    if (authToken) {
      request.headers.common.Authorization = `Bearer ${authToken}`;
    }
    
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      // handle api status code
      return response;
    },
    (error) => {
      const response = _.get(error, 'response');
      // need handle alert error
      return Promise.reject(response);
    },
  );

  // Auth
  const login = (username, password) => {
    const data = {
      username,
      password,
    };
    return api.post('/auth/signIn', data);
  };
  const signUp = (username, password,role) => {
    const data = {
      username,
      password,
      role
    };
    return api.post('/auth/signUp', data);
  };

  const logout = () => {
    return api.post('/auth/signOut');
  };

  const getUser = ()=>{
    return api.get('/user/getInfo')
  }
  
  const getCode = ()=>{
    return api.get('/getQRCode')
  }

  return {
    login,
    logout,
    signUp,
    getUser,
    getCode
  };
};

export default {
  create,
  setAuthToken,
};