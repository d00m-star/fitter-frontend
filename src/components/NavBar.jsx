import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ user, logout }) => {
  if (user) {
    forUser = (
      <nav className="navbar">
        {/* add logo icon */}
        <Link to="">
          <img src="" alt="logo" />
          LOGO
        </Link>
        <div>
          {/* add feed/home, logout icon */}
          <Link to="/home">
            <img src="" alt="feed" />
            FEED
          </Link>
          <Link to="/" onClick={logout}>
            <img src="" alt="logout" />
            LOGOUT
          </Link>
        </div>
        <div>
          {/* add profpic icon */}
          <Link to="">
            <img src="" alt="logo" />
          </Link>
          <h3>Hi, {user.name} </h3>
        </div>
      </nav>
    )
  }

  const forPublic = <nav></nav>

  return <header>{user ? forUser : forPublic}</header>
}

export default NavBar
