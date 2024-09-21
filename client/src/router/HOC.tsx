import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IPrivateRoute {
  signComponent?: boolean;
  component: React.ComponentType<any>;
}

export const PrivateRoute = ({
  component: Component,
  signComponent = false,
  ...rest
}: IPrivateRoute) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access");

    if (signComponent && accessToken) {
      return navigate("/", { replace: true });
    }

    if (!accessToken && !signComponent) {
      return navigate("/signIn");
    }
  }, [window.location.pathname]);

  return <Component {...rest} />;
};
