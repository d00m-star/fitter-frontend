import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = ({ user, logout }) => {
  return (
    <header>
      {user ? (
        <nav className="navbar">
          {/* add logo icon */}
          <Link to="/feed">
            <img src="" alt="logo" />
          </Link>
          <div className="nav-links">
            <div>
              {/* add feed/home, logout icon */}
              <NavLink
                to="/feed"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                <img src="" alt="feed" />
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={logout}
              >
                <img src="" alt="logout" />
              </NavLink>
            </div>
            <div>
              {/* add profpic icon */}
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                <img src="" alt="profile" />
              </NavLink>
              <h3>Hi, {user.name} </h3>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}

export default NavBar
