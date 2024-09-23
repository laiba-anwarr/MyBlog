import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider, useSelector } from "react-redux";
import store from "./store/Store.js";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx'
// import AuthLayout from "./components/AuthLayout.jsx";
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import MainPost from "./pages/MainPost.jsx";



const router = createBrowserRouter([
  {
    path: '/',
    element : <App/>,
    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/login',
        element: <Login />
      },
      {
        path:'/signup',
        element:<Signup />
      },
      {
        path:'/all-posts',
        element:<AllPost />
      },
      {
        path:'/add-post',
        element:<AddPost />
      },
      {
        path:'/edit-post/:slug',
        element:<EditPost />
      }
      ,{
        path :'/post/:slug',
        element:<MainPost />
      }
      // {
      //   path:'/Signup',

      //   element:(
      //     <AuthLayout authentication={false}>
      //       <Signup />
      //     </AuthLayout>
      //   )
      // },

     
      

    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}  />
    </Provider>
  </StrictMode>
);
