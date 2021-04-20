import { useSelector, useDispatch } from 'react-redux';
import UserActions from '../stores/userRedux';


const useUserInfo = () => {
  const userInfo = useSelector((state) => {
    return state.user});
  const dispatch = useDispatch();
  const getInfo = (onSuccess, onError) => {
    //userGetInfo ??
    dispatch(UserActions.userGetInfo(onSuccess, onError));
  }
  const clearUserData = () => dispatch(UserActions.userClearUserData());

  const getOrders = (onSuccess, onError) =>{
    dispatch(UserActions.userGetOrders(onSuccess, onError));
  }

  return {
    userInfo,
    getInfo,
    getOrders,
    clearUserData,
  };
};

export { useUserInfo };
