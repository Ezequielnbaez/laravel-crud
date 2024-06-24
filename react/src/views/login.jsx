import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axios-client";


export default function Login() {

    const mailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()
        setErrors(null);

        const payload = {
            email: mailRef.current.value,
            password: passwordRef.current.value,
        }


        axiosClient.post('/login', payload).then(({ data }) => {
            setToken(data.token);
            setUser(data.user);
        })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            });

    }

    return (
        <div>
            <div className="background">
            </div>
            {errors && <div className="alert">
                {Object.keys(errors).map(key =>
                    <p key={key}>{errors[key][0]}{errors[key][1]}</p>)}
            </div>
            }
            <form onSubmit={onSubmit}>
                <h3>Login Here</h3>

                <label htmlFor="username">Username</label>
                <input ref={mailRef} className="inputLog" type="text" placeholder="Email" id="username" />

                <label htmlFor="password">Password</label>
                <input ref={passwordRef} className="inputLog" type="password" placeholder="Password" id="password" />

                <button className="log">Log In</button>

                <p>
                    Not registered? <Link to="/register">Create an account</Link>
                </p>
            </form>
        </div>
    )
}