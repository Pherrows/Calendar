import React, { useEffect } from 'react';
import { LogInUser, findLoginUser, isUserLogin } from '../features/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

function AuthCheck(props) {
  const isLogin = useSelector(isUserLogin)
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginUser) {
      dispatch(findLoginUser(loginUser));
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [])

  if (!isLogin) {
    return <Navigate to='/login' />
  }


  return props.children;
}

export default AuthCheck;