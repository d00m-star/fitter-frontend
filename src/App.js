import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import CommentDetails from './pages/CommentDetails'
import FeatDetails from './pages/FeatDetails'
import Feed from './pages/Feed'
import Home from './pages/Home'
import Profile from './pages/Profile'
import './App.css'
import { CheckSession } from './services/Auth'
function App() {
  const [user, setUser] = useState(null)
  const [feats, setFeats] = useState(null)
  // const [comments, setComments] = useState([])
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
        <Route path="/" element={<Home setUser={setUser} />} />
      </Routes>
      <main>
        <header>
          <NavBar />
        </header>
        <Routes>
          <Route
            path="/feed"
            element={<Feed feats={feats} setFeats={setFeats} />}
          />
          <Route
            path="/profile"
            element={<Profile user={user} feats={feats} />}
          />
          <Route path="/commentdeets" element={<CommentDetails />} />
          <Route path="/featdeets" element={<FeatDetails />} />
        </Routes>
      </main>
    </div>
  )
}
export default App
