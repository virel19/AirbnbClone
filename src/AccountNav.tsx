import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function AccountNav() {

    const [selectedButton, setSelectedButton] = useState('profile');
    const { pathname } = useLocation();

    useEffect(() => {

        if (pathname === '/account') {
            setSelectedButton('profile');
        } else if (pathname === ('/account/bookings')) {
            setSelectedButton('bookings');
        } else if (pathname === ('/account/favorites')) {
            setSelectedButton('favorites');
        } else {
            setSelectedButton('places');
        }
    }, [pathname]);

    return (
        <nav className="account-page-button-layout">
            <Link style={{
                display: 'flex',
                alignItems: 'center',
                color: selectedButton == 'profile' ? 'white' : 'black',
                background: selectedButton == 'profile' ? '#ff385c' : 'none',
                borderRadius: '20px',
                padding: '10px',
                textDecoration: 'none',
                paddingLeft: '20px',
                paddingRight: '20px',
                gap: '5px',
            }}
                to={'/account'}
                onClick={() => setSelectedButton('profile')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>

                My Profile
            </Link>

            <Link style={{
                display: 'flex',
                alignItems: 'center',
                color: selectedButton == 'bookings' ? 'white' : 'black',
                background: selectedButton == 'bookings' ? '#ff385c' : 'none',
                padding: '10px',
                paddingLeft: '20px',
                paddingRight: '20px',
                borderRadius: '20px',
                textDecoration: 'none',
                gap: '5px',
            }}
                to={'/account/bookings'}
                onClick={() => setSelectedButton('bookings')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>

                My Bookings
            </Link>

            <Link style={{
                display: 'flex',
                alignItems: 'center',
                color: selectedButton == 'places' ? 'white' : 'black',
                background: selectedButton == 'places' ? '#ff385c' : 'none',
                padding: '10px',
                paddingLeft: '20px',
                paddingRight: '20px',
                borderRadius: '20px',
                textDecoration: 'none',
                gap: '5px',
            }}
                to={'/account/places'}
                onClick={() => setSelectedButton('places')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

                My Places
            </Link>

            <Link style={{
                display: 'flex',
                alignItems: 'center',
                color: selectedButton == 'favorites' ? 'white' : 'black',
                background: selectedButton == 'favorites' ? '#ff385c' : 'none',
                padding: '10px',
                paddingLeft: '20px',
                paddingRight: '20px',
                borderRadius: '20px',
                textDecoration: 'none',
                gap: '5px',
            }}
                to={'/account/favorites'}
                onClick={() => setSelectedButton('favorites')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icons">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>


                My Favorites
            </Link>
        </nav>
    )
}

export default AccountNav;