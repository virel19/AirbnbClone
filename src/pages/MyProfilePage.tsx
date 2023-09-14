import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import { useFavorites } from "../FavoritesUtil";



function ProfilePage() {
    const { loading, user, setUser } = useContext(UserContext);
    const { clearFavorites } = useFavorites();
    const navigate = useNavigate();

    async function logout() {
        await axios.post('/logout');
        if (setUser) {
            setUser({ name: '', email: '' });
        }

        clearFavorites();

        navigate('/');
    }

    if (!loading) {
        return 'Loading...';
    }

    if (user?.name == '' || user?.email == '') {
        return <Navigate to='/login' />
    }

    return (
        <>

            <div className="account-page-layout">
                <AccountNav />
                <div className="my-profile-page">
                    <div className="profile-card">
                        <div className="profile-avatar">
                            <div className="inital">{user?.name?.charAt(0).toUpperCase()}</div>
                        </div>
                        <h1>{user?.name}</h1>
                        {user?.email}
                    </div>
                    <button className="logout-button" onClick={logout}>Logout</button>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
