import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ContactBook from "../pages/ContactBook/ContactBook";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        
        path: "",
        element: <ContactBook />,
        loader: () => {
            if (!localStorage.getItem("token")) {
              return redirect("/login");
            } else {
              return null;
            }
          }
      },
   
      {
        path: "/login",
        element: <Login />,
        loader: () => {
           
          if (localStorage.getItem("token")) {
            return redirect("/");
          } else {
            return null;
          }
        }
        
      },
      {
        path: "/signup",
        element: <SignUp />,
        loader: () => {
           
          if (localStorage.getItem("token")) {
            return redirect("/");
          } else {
            return null;
          }
        }
      },
      {
        
        path: "/*",
        element: <ContactBook />,
        loader: () => {
            if (!localStorage.getItem("token")) {
              return redirect("/login");
            } else {
              return null;
            }
          }
      }

    ],
  },
]);

export default router;
