import React, { useRef, useEffect, useState } from 'react';
import { shallowEqual, useSelector, connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import * as auth from './AuthRedux'
import { logoutUser, authMe } from '../store/auth/login/actions';
import * as loginFunctions from './Api/authInit';
// import { getActionsFromCurrentUser } from './functions';
// import { setCurrentActions } from './Utils';

const mapState = (state) => ({ authUser: state.authUser });
const connector = connect(mapState, {
  logout: logoutUser,
  login: authMe,
});

const AuthInit = (props) => {
  const { children, logout, login } = props;
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const accessToken = useSelector(
    (state) => state?.Login.user.token,
    shallowEqual
  );
  const history = useHistory();
  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const data = await loginFunctions.getUserByToken();
          // const acciones = getActionsFromCurrentUser(data);
          if (!data?.isActive) throw Error('usuario inactivo');
          // setCurrentActions(acciones);
          dispatch(login(data));
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          dispatch(logout(history));
        }
      } finally {
        setShowSplashScreen(false);
      }
      /* eslint-disable no-return-assign */
      return () => (didRequest.current = true);
    };
    if (accessToken) {
      requestUser();
    } else {
      // dispatch(logout(history));
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <div className="loading" /> : <>{children}</>;
};

export default connector(AuthInit);
