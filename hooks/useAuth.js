import {useSelector, useDispatch} from 'react-redux';
import AuthActions from '../stores/authRedux';

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const login = (username, password, onSuccess, onError) =>
    dispatch(AuthActions.authLogin(username, password, onSuccess, onError));
  const signUp = (username, password, role, onSuccess, onError) =>
    dispatch(
      AuthActions.authSignUp(username, password, role, onSuccess, onError),
    );
  const logout = (onSuccess, onError) =>
    dispatch(AuthActions.authLogout(onSuccess, onError));
  const clearAllData = () => dispatch(AuthActions.authClearAllData());
  return {
    auth,
    login,
    clearAllData,
    logout,
    signUp,
  };
};

export {useAuth};