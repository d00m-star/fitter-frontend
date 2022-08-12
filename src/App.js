import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import CommentDetails from './pages/CommentDetails'
import FeatDetails from './pages/FeatDetails'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'

import './App.css'
import { CheckSession } from './services/Auth'

function App() {
  const [user, setUser] = useState(null)
  const [feats, setFeats] = useState(null)

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
      <main>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
