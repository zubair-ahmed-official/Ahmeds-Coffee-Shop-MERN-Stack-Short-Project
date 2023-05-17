import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './Components/AddCoffee/AddCoffee.jsx';
import UpdateCoffee from './Components/UpdateCoffee/UpdateCoffee.jsx';
import Headers from './Components/Headers/Headers.jsx';
import OrderCoffee from './Components/OrderCoffee/OrderCoffee.jsx';
import Orders from './Components/Orders/Orders.jsx';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import AuthProvider from './Components/Providers/AuthProvider.jsx';
import PrivateRoutes from './Components/Routes/PrivateRoutes.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider><Headers></Headers></AuthProvider>,
    children: [
      {
        path:'/',
        element: <App></App>,
        loader: () => fetch('https://ahmeds-coffee-express.vercel.app/totalCoffees')
      },
      {
        path:'/AddCoffee',
        element: <PrivateRoutes><AddCoffee></AddCoffee></PrivateRoutes>
      },
      {
        path:'/UpdateCoffee/:id',
        element: <PrivateRoutes><UpdateCoffee></UpdateCoffee></PrivateRoutes>,
        loader: ({params})=> fetch(`https://ahmeds-coffee-express.vercel.app/coffee/${params.id}`)
      },
      {
        path: '/OrderCoffee/:id',
        element: <PrivateRoutes><OrderCoffee></OrderCoffee></PrivateRoutes>,
        loader: ({params})=> fetch(`https://ahmeds-coffee-express.vercel.app/coffee/${params.id}`)
      },
      {
        path:'/Orders',
        element: <PrivateRoutes><Orders></Orders></PrivateRoutes>
        // loader: ()=> fetch('https://ahmeds-coffee-express.vercel.app/orderCoffee')
      },
      {
        path: '/Login',
        element:  <Login></Login>
      },
      {
        path: '/SignUp',
        element:<SignUp></SignUp>
      }
    ]
  }

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider><RouterProvider router={router}></RouterProvider></AuthProvider>
  </React.StrictMode>,
)
