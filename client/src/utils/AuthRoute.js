import React from 'react';
import { isLoggedIn } from '../auth'
import { Navigate } from 'react-router-dom';


function AuthRoute({ children, redirectTo }) {
  return isLoggedIn() ? <Navigate to={redirectTo} /> : children;
}

export default AuthRoute;
