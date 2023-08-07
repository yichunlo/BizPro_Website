import React, { useEffect, useState } from 'react';
import Backstage from '../pages/Backstage';

import { Navigate } from 'react-router-dom';

function PrivateRouteBackstage({ token, backstage }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      window.location.href = '/login';
      return <Navigate to="/login" />;
    }
  }, [isLoggedIn]);
  return <>{isLoggedIn ? <Backstage /> : null}</>;
}

export default PrivateRouteBackstage;
