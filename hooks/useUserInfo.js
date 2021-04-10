import {useSelector, useDispatch} from 'react-redux';
import UserActions from '../stores/userRedux';

const useUserInfo = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const getInfo = (onSuccess, onError) =>
  //userGetInfo ??
      dispatch(UserActions.userGetInfo(onSuccess, onError));
  return {
    userInfo,
    getInfo,
  };
};

export {useUserInfo};