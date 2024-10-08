import axios from 'axios';
import _ from 'lodash';
import { Platform } from 'react-native';

let authToken = null;
const setAuthToken = (token) => {
  authToken = token;

};

const create = () => {
  const api = axios.create({
    baseURL: 'https://xgc5h.sse.codesandbox.io/',
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
  const signUp = (username, password, role) => {
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

  const getUser = () => {
    return api.get('/user/getInfo')
  }

  const getCode = () => {
    return api.get('/getQRCode')
  }
  const getOrders = () => {
    console.log('api getOrders');
    return api.get('/user/getOrders')
  }
  const getHistory = () => {
    console.log('api getHistory');
    return api.get('/user/getHistory')
  }
  const updateInfo = (email, address, avatar) => {
    const data = {
      email, 
      address, 
      avatar
    };
    return api.post('/user/updateInfo', data);
  };
  const changePassword = (currentPassword, newPassword) => {
    const data = {
      currentPassword, 
      newPassword
    };
    return api.post('/user/changePassword', data);
  };

  return {
    login,
    logout,
    signUp,
    getUser,
    getCode,
    getOrders,
    getHistory,
    updateInfo,
    changePassword
  };
};

export default {
  create,
  setAuthToken,
};