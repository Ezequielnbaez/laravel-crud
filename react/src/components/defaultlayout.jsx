import { Outlet, Link, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider.jsx";
import { useEffect } from "react";
import axiosClient from "../axios-client.js";


export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext()

    //si no hay token nos redirige a loguearse
    //protegiendo la página
    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout=(ev) =>{
        ev.preventDefault()
        axiosClient.post('/logout').then (()=>{
            setUser({});
            setToken(null);
        })
    }

    useEffect(()=>{
        axiosClient.get('/user').then(({data})=>{
            setUser(data);
        });
    },[]);

    return (
        <div>
            <nav>
                <div className="wrapper">
                    <div className="logo"><a href="#">Logo</a></div>
                    <input type="radio" name="slider" id="menu-btn" />
                    <input type="radio" name="slider" id="close-btn" />
                    <ul className="nav-links">
                        <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times">
                                </i></label>
                        <li>
                            <a href="#" className="desktop-item">{user.name}</a>
                            <input type="checkbox" id="showDrop" />
                            <label htmlFor="showDrop" className="mobile-item"></label>
                            <ul className="drop-menu">
                                <li><a href="#">Drop menu 1</a></li>
                                <li><a href="#">Drop menu 2</a></li>
                                <li><a href="#">Drop menu 3</a></li>
                                <li><a href="#" onClick={onLogout}>Logout</a></li>
                            </ul>
                        </li>                    </ul>
                    <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i>
                    </label>
                </div>
            </nav>
            <div className="sidebar">
                <aside className="main-menu">
                    <ul>
                        <li>
                            <Link to="/dashboard">
                                <i className="fa fa-home fa-2x"></i>
                                <span className="nav-text">
                                    Dashboard
                                </span>
                            </Link>

                        </li>
                        <li className="has-subnav">
                            <Link to="/products">
                                <i className="fa fa-globe fa-2x"></i>
                                <span className="nav-text">
                                    Users
                                </span>
                            </Link>

                        </li>
                    </ul>
                </aside>
            </div>
            <Outlet />
        </div>
    )
}

//Sin outlet, no se verían las páginas children