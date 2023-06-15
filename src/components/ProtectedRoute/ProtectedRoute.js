import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";

const ProtectedRouteElement = ({ element: Component, loggedIn, isLoading }) => {
  if (isLoading) {
    // Показываем компонент загрузки или прелоадер
    return <Preloader />;
  }

  return loggedIn ? <Component /> : <Navigate to="/signin" replace />;
};

export default ProtectedRouteElement;

