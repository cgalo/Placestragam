import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks:React.FC<{}> = (props) => {
    const auth = useContext(AuthContext);   // Get if the user is logged in

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact={true}>
                    ALL USERS
                </NavLink>
            </li>
            
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/u1/places">
                        MY PLACES
                    </NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">
                        ADD PLACE
                    </NavLink>
                </li>
            )}
            
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">
                        LOGIN/SIGNUP
                    </NavLink>
                </li>
            )}

        </ul>
    );
}

export default NavLinks;