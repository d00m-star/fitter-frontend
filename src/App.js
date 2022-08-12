import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import CommentDetails from './pages/CommentDetails'
import FeatDetails from './pages/FeatDetails'
import Feed from './pages/Feed'
import Home from './pages/Home'
import Profile from './pages/Profile'
import CommentCard from './components/CommentCard'
import FeatCard from './components/FeatCard'
import LoginForm from './components/LoginForm'
import FeatForm from './components/FeatForm'
import SignUpForm from './components/SignUpForm'
import CommentForm from './components/CommentForm'

import './App.css'
import { CheckSession } from './services/Auth'

function App() {
  const [user, setUser] = useState(null)
  const [feats, setFeats] = useState(null)
  const [comments, setComments] = useState([])

  const logout = () => {
    setUser(null)
    setFeats(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) checkToken()
  }, [])

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setUser={setUser}
              SignUpForm={SignUpForm}
              LoginForm={LoginForm}
            />
          }
        />
      </Routes>
      <main>
        <header>
          <NavBar />
        </header>
        <Routes>
          <Route
            path="/feed"
            element={<Feed feats={feats} FeatForm={FeatForm} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/commentdeets" element={<CommentDetails />} />
          <Route
            path="/featdeets"
            element={
              <FeatDetails
                CommentCard={CommentCard}
                FeatCard={FeatCard}
                comments={comments}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
