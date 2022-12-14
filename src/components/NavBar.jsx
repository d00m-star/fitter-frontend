import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CgProfile, CgHome, CgLogOut } from 'react-icons/cg'

const NavBar = ({ user, logout }) => {
  return (
    <header>
      {user ? (
        <nav className="navbar">
          {/* add logo icon */}
          <Link to="/feed" id="logo">
            <img src="" alt="logo" />
          </Link>
          {/* <div className="nav-links"> */}
          <div className="nav-mid">
            <NavLink
              to="/feed"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <CgHome className="icon" />
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={logout}
            >
              <CgLogOut className="icon" size="1.15em" />
            </NavLink>
          </div>
          <div className="nav-prof">
            <NavLink
              to={`/profile/${user.username}`}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <CgProfile className="icon" />
            </NavLink>
            <h3>Hi, {user.username} </h3>
          </div>
          {/* </div> */}
        </nav>
      ) : null}
    </header>
  )
}

export default NavBar
