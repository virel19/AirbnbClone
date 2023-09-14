import logo from './assets/homeColor.png';
import search from './assets/icons8-search-30white.png';
import menu from './assets/more.png';
import account from './assets/account.png';
import globe from './assets/globe.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { useSearchQuery } from './context/SearchQueryContext';


function NavBar() {
    const { user } = useContext(UserContext);
    const { searchQuery, setSearchQuery } = useSearchQuery();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            setSearchQuery(e.currentTarget.value);
        }
    };
    
    return (
        <nav className='nav'>
            <Link to={'/'} className='logo-button'>
                <img src={logo} alt='Home' className='logo' />
                <span className='logo-name'>airbnb</span>
            </Link>
            <div className='search-bar'>
            <input
                type='text'
                placeholder='Search by city'
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                className='search-input'
            />
                <button className='search-icon-button'>
                    <img src={search} alt='Search' className='search-icon' />
                </button>
            </div>
            <div className='nav-right-cotainer'>
                <img src={globe} alt='Search' className='globe' />
                <Link to={user ? '/account' : '/login'} className="user">
                    <img src={menu} alt='Search' className='menu' />
                    <img src={account} alt='Search' className='account' />
                    {user ? ( 
                        <div className="username">{user.name}</div>
                    ): null}
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;