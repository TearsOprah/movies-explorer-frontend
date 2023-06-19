import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";

const ProtectedRouteElement = ({ element: Component, loggedIn, isLoading, ...props }) => {
  if (isLoading) {
    // Показываем компонент загрузки или прелоадер
    return <Preloader />;
  }

  return loggedIn ? <Component {...props} /> : <Navigate to="/" replace />;
};

export default ProtectedRouteElement;

