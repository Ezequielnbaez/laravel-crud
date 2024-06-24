import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/contextprovider";

export default function Register() {

    //useREf es parecido a state ya que te deja guardar datos
    // es distinto porque no triggerea un render del component
    //y ref no son usados como return values
    //sintesis: si vas a usar un valor para mostrar usa state, sino ref
    const nameRef = useRef();
    const mailRef = useRef();
    const passwordRef = useRef();
    const passwordConfRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();


    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: mailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfRef.current.value,
        }

        //OJO PASSWORD CONFIRMATION DEBE SER EXACTAMENTE PARA QUE LARAVEL BUSQUE ASÍ

        axiosClient.post('/register', payload).then(({ data }) => {
            setToken(data.token);
            setUser(data.user);
        })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
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
            <form className="registerform" onSubmit={onSubmit}>
                <h3>Register Here</h3>
                <label htmlFor="username">Name</label>
                <input ref={nameRef} type="text" placeholder="Full name" id="fullname" />

                <label htmlFor="username">Email</label>
                <input ref={mailRef} type="text" placeholder="Email or Phone" id="username" />

                <label htmlFor="password">Password</label>
                <input ref={passwordRef} type="password" placeholder="Password" id="password" />

                <label htmlFor="password">Password confirmation</label>
                <input ref={passwordConfRef} type="password" placeholder="Password" />

                <button className="log">Register</button>

                <p>
                    Already register? <Link to="/Login">Log in</Link>
                </p>
            </form>
        </div>
    )
}