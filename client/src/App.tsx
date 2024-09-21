import { useEffect } from "react";
import "./App.css";
import { useAuthMutation } from "./redux/api/auth";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  const [refreshToken, { data, isSuccess, isError }] = useAuthMutation();
  const refresh = localStorage.getItem("refresh");

  useEffect(() => {
    if (!isError && refresh) {
      const intervalRefresh = setInterval(() => {
        refreshToken({
          url: "token/refresh/",
          method: "POST",
          body: {
            refresh,
          },
        });
      }, 180000);
      if (data?.access) {
        localStorage.removeItem("access");
        localStorage.setItem("access", data?.access);
      }
      return () => clearInterval(intervalRefresh);
    }
  }, [refresh, isSuccess, data]);

  return <RouterProvider router={router} />;
}

export default App;
