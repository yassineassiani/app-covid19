import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to="/" >Home</Link>
            <span> | </span>
            <Link to="/App1" >disc</Link>
            <span> | </span>
            <Link to="/PostsCy" >discCy</Link>
            
            <span> | </span>
            {user ? (
                <>
                    <Link to="/profile" >Profile</Link>
                    <p onClick={logoutUser}>Logout</p>
                </>
            ): (
                <>
                    <Link to="/login" >Login</Link>
                    <span> | </span>
                    <Link to="/singup" >Signup</Link>
                </>
            )}
           
            {user &&   <p>Hello {user.first_name}</p>}
           
        </div>
    )
}

export default Header
