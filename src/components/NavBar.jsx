import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = ({ user, logout }) => {
  return (
    <nav className="navbar">
      {/* add logo icon */}
      <Link to="">
        <img src="" alt="logo" />
        LOGO
      </Link>
      <div className="nav-links">
        <div>
          {/* add feed/home, logout icon */}
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <img src="" alt="feed" />
            FEED
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            onClick={logout}
          >
            <img src="" alt="logout" />
            LOGOUT
          </NavLink>
        </div>
        <div>
          {/* add profpic icon */}
          <NavLink
            to=""
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            <img src="" alt="logo" />
          </NavLink>
          <h3>Hi, {user.name} </h3>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
