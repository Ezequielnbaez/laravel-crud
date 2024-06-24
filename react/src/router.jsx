import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import Products from "./views/products.jsx";
import NotFound from "./views/notfound.jsx";
import Dashboard from "./views/dashboard.jsx";
import DefaultLayout from "./components/defaultlayout.jsx";
import GuestLayout from "./components/guestlayout.jsx";
import ProductForm from "./views/productform.jsx";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/products"/>
            },
            {
                path: '/products',
                element: <Products />
            },
            
            {
                path: '/products/new',
                element: <ProductForm key="productCreate"/>
            },
            
            {
                path: '/products/:id',
                element: <ProductForm key="productUpdate"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
])

export default router;