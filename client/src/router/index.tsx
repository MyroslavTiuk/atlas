import { createBrowserRouter } from "react-router-dom";
import SignIn from "../layouts/SignIn/index.tsx";
import SignUpFirst from "../layouts/SignUp/SignUpFirst/index.tsx";
import SignUpSecond from "../layouts/SignUp/SignUpSecond/index.tsx";
import { PrivateRoute } from "./HOC.tsx";
import ForgotPassword from "../layouts/SignIn/ForgotPassword";
import Verify from "../layouts/SignIn/Verify";
import VerifyLogin from "../layouts/SignIn/VerifyLogin";
import Security from "../layouts/SignIn/Security";
import ConfirmForgotPassword from "../layouts/SignIn/ConfirmForgotPassword";
import Home from "../layouts/Home/index.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute component={Home} />,
  },
  {
    path: "/signIn",
    element: <PrivateRoute component={SignIn} signComponent />,
  },
  {
    path: "/signIn/verify-login",
    element: <PrivateRoute component={VerifyLogin} signComponent />,
  },
  {
    path: "/signIn/verify",
    element: <PrivateRoute component={Verify} signComponent />,
  },
  {
    path: "/signIn/forgot-password",
    element: <PrivateRoute component={ForgotPassword} signComponent />,
  },
  {
    path: "/signIn/confirm-forgot-password",
    element: <PrivateRoute component={ConfirmForgotPassword} signComponent />,
  },
  {
    path: "/signIn/security",
    element: <PrivateRoute component={Security} signComponent />,
  },
  {
    path: "/signUp",
    element: <PrivateRoute component={SignUpFirst} signComponent />,
  },
  {
    path: "/signUp/security",
    element: <PrivateRoute component={SignUpSecond} signComponent />,
  },
  // {
  //   path: "/signUp/verify",
  //   element: <SignUpThird />,
  // },
]);
