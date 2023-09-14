import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handleLogin(event: { preventDefault: () => void; }) {
        event.preventDefault();
        try {
            if (setUser) {
                const userInfo = await axios.post('/login', { email, password }, { withCredentials: true });
                setUser(userInfo.data);
                alert('Login Successful');
                setIsLoggedIn(true);
            }
        } catch (e) {
            console.error(e);
            alert('Login failed');
        }
    }

    if (isLoggedIn) {
        return <Navigate to={'/account'} />
    }

    return (
        <>
            <div className="login">
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)}></input>
                    <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}></input>
                    <button className="login-button">Login</button>
                    <div style={{ textAlign: 'center', padding: '10px' }}> Dont have an account?
                        <Link style={{ color: 'blue', textDecoration: 'underline' }} to={'/register'}> Register Here.</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginPage;

