import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { SignIn } from "../screens/SignIn";
import { Home } from "../screens/Home";
import { SignUp } from "../screens/SignUp";

  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn/>,
    },
    {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/sign-up",
        element: <SignUp/>,
      },
      {
        path: "/dashboard",
        element: <Home/>,
      },
  ]);