import { useSelector, useDispatch } from 'react-redux';
import UserActions from '../stores/userRedux';

const useUserInfo = () => {
  const userInfo = useSelector((state) => {
    return state.user
  });
  const dispatch = useDispatch();
  const getInfo = (onSuccess, onError) => {
    //userGetInfo ??
    dispatch(UserActions.userGetInfo(onSuccess, onError));
  }
  const clearUserData = () => dispatch(UserActions.userClearUserData());

  const getOrders = (onSuccess, onError) => {
    dispatch(UserActions.userGetOrders(onSuccess, onError));
  }
  const getHistory = (onSuccess, onError) => {
    dispatch(UserActions.userGetHistory(onSuccess, onError));
  }
  const changePassword = (currentPassword, newPassword, onSuccess, onError) =>
    dispatch(UserActions.userChangePassword(currentPassword, newPassword, onSuccess, onError));

  const updateInfo = (email, address, avatar, onSuccess, onError) =>
    dispatch(UserActions.userUpdateInfo(email, address, avatar, onSuccess, onError));
  return {
    userInfo,
    getInfo,
    getOrders,
    clearUserData,
    getHistory,
    changePassword,
    updateInfo,
  };
};

export { useUserInfo };
