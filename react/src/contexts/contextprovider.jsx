import { createContext, useState, useContext } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})
//Con esto puedo conseguir el contexto del usuario
//Si se logueó o no por ej.
//Guardo el estado con useState de user y setUser
//envío el token de inicio para autenticar
//la sesión para que se guarde en localstorage
//Acordarse que se debe declarar en main.jsx para que el contexto funcione
// y el router debe ser child de el mismo
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
} 

export const useStateContext = () => useContext(StateContext);