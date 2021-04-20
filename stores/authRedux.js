import { createReducer, createActions } from 'reduxsauce';

const { Creators, Types } = createActions({
  authLogin: ['username', 'password', 'onSuccess', 'onError'],
  authLogout: ['onSuccess', 'onError'],
  authClearAllData: [],
  authSetUser: ['data'],
  authSignUp: ['username', 'password', 'role', 'onSuccess', 'onError'], // => type = AUTH_SIGN_UP

});

export const AuthTypes = Types;
export default Creators; // actions

const INIT_STATE = {
  user: {

  },
  loggedIn: false,
};

const login = (state, action) => {
  return state;
};

const signUp = (state, action) => {
  return state;
};

const setUser = (state, action) => {
  const { token } = action.data;
  let newUser = { ...state.user };
  if (token) {
    newUser = {
      ...newUser,
      token: action.data.token,
    };
  }
  return {
    user: newUser,
    loggedIn: true,
  };
};

const logout = (state, action) => {
  return state;
};

const clearAllData = (state, action) => {
  return { ...INIT_STATE };
};

// pattern
const HANDLERS = {
  [Types.AUTH_LOGIN]: login,
  [Types.AUTH_LOGOUT]: logout,
  [Types.AUTH_CLEAR_ALL_DATA]: clearAllData,
  [Types.AUTH_SET_USER]: setUser,
  [Types.AUTH_SIGN_UP]: signUp,
};

//authSignup = auth_signup
//authSignUp = auth_sign_up

export const reducer = createReducer(INIT_STATE, HANDLERS);