import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import CommentDetails from './pages/CommentDetails'
import FeatDetails from './pages/FeatDetails'
import Feed from './pages/Feed'
import Home from './pages/Home'
import Profile from './pages/Profile'

import './App.css'
import { CheckSession } from './services/AuthReq'
import { PostFeat } from './services/FeatReq'

function App() {
  const [user, setUser] = useState(null)
  const [feats, setFeats] = useState(null)
  // const [comments, setComments] = useState([])
  const [signUp, setSignUp] = useState(true)
  const [upOrIn, setUpOrIn] = useState('Login')
  const [featFormDisplay, setFeatFormDisplay] = useState('none')
  const [featFormValues, setFeatFormValues] = useState({
    type: '',
    bodyPart: '',
    intensity: 0,
    description: '',
    image: ''
  })
  const [emoji, setEmoji] = useState('')
  const [active, setActive] = useState(false)

  const displayCreateFeat = () => {
    featFormDisplay === 'none'
      ? setFeatFormDisplay('flex')
      : setFeatFormDisplay('none')
    !active ? setActive(true) : setActive(false)
  }

  const updateFeatFormValues = (e) => {
    e.target.id === 'intensity'
      ? setFeatFormValues({
          ...featFormValues,
          [e.target.id]: Number(e.target.value)
        })
      : setFeatFormValues({ ...featFormValues, [e.target.id]: e.target.value })
    switch (featFormValues.intensity) {
      case 0:
        setEmoji('a')
        break
      case 1:
        setEmoji('b')
        break
      case 2:
        setEmoji('c')
        break
      case 3:
        setEmoji('d')
        break
      case 4:
        setEmoji('e')
        break
      case 5:
        setEmoji('f')
        break
      default:
    }
  }

  const submitFeatForm = async (e) => {
    e.preventDefault()
    const data = await PostFeat()
    setFeats(data)
    setFeatFormDisplay('none')
  }

  const logout = () => {
    setUser(null)
    setFeats(null)
    localStorage.clear()
    setSignUp(false)
    setUpOrIn('Sign Up')
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
      <NavBar user={user} logout={logout} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setUser={setUser}
                signUp={signUp}
                upOrIn={upOrIn}
                setSignUp={setSignUp}
                setUpOrIn={setUpOrIn}
              />
            }
          />
          <Route
            path="/feed"
            element={
              <Feed
                feats={feats}
                active={active}
                featFormValues={featFormValues}
                featFormDisplay={featFormDisplay}
                updateFeatFormValues={updateFeatFormValues}
                displayCreateFeat={displayCreateFeat}
                submitFeatForm={submitFeatForm}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                feats={feats}
                active={active}
                featFormValues={featFormValues}
                featFormDisplay={featFormDisplay}
                updateFeatFormValues={updateFeatFormValues}
                displayCreateFeat={displayCreateFeat}
                submitFeatForm={submitFeatForm}
              />
            }
          />
          <Route
            path="/commentdeets/:comment_id"
            element={<CommentDetails />}
          />
          <Route path="/featdeets" element={<FeatDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
