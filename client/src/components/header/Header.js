import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'


function Header() {
    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth


    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="/profile" className="avatar">
            <img src={user.avatar} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <header>
            <div className="logo">
                <h1><Link to="/">
                        <div class="rad-logo-container rad-nav-min">               
                            <img 
                            id="logoWeclashImage" 
                            src="https://static.wixstatic.com/media/5838f5_07d551e5984f48c7983061f9c41a2650~mv2.png/v1/fill/w_429,h_162,al_c,usm_0.66_1.00_0.01,enc_auto/Original%20on%20Transparent.png" 
                            alt="weclash" />
                        </div>
                    </Link>
                </h1>
            </div>

            <ul style={transForm}>
                {/* <li>
                    <Link to="/buckets">
                    <i className="fas fa-shopping-cart"></i> Buckets
                    </Link>
                </li> */}
                {
                    isLogged
                    ? 
                    <li>
                        <Link to="/buckets">
                        <i className="fas fa-shopping-cart"></i> Buckets
                        </Link>
                    </li>
                    :<li></li>
                }
                {
                    isLogged
                    ? userLink()
                    :<li>
                        <Link to="/login"><i className="fas fa-user">
                            </i> Sign in
                        </Link>
                    </li>
                }
                
            </ul>
        </header>
    )
}

export default Header
