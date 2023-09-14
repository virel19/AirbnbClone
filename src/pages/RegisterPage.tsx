import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(e: { preventDefault: () => void; }) {
        e.preventDefault();

        try{
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration successful.');
        }catch(e){
            alert('Registration failed');
        }
    }

    return (
        <>
            <div className="login">
                <h1>Register</h1>
                <form className="login-form" onSubmit={registerUser}>
                    <input placeholder="Name" value={name} onChange={event => setName(event.target.value)}></input>
                    <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)}></input>
                    <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}></input>
                    <button className="login-button">Sign up</button>
                    <div style={{ textAlign: 'center', padding: '10px' }}> Already registered?
                        <Link style={{ color: 'blue', textDecoration: 'underline' }} to={'/login'}> Login</Link>
                    </div>

                </form>
            </div>
        </>
    );
}

export default RegisterPage;