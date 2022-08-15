import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import NavBar from './components/NavBar'
import FeatDetails from './pages/FeatDetails'
import Feed from './pages/Feed'
import Home from './pages/Home'
import Profile from './pages/Profile'

import './App.css'
import { CheckSession } from './services/AuthReq'
import { PostFeat, DeleteFeat, UpdateFeat } from './services/FeatReq'
import { PostComment, UpdateComment } from './services/ComReq'

function App() {
  let navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [feats, setFeats] = useState(null)
  const [comments, setComments] = useState(null)
  const [signUp, setSignUp] = useState(true)
  const [upOrIn, setUpOrIn] = useState('Login')
  const [formDisplay, setFormDisplay] = useState('none')
  const [commentFormValues, setCommentFormValues] = useState({
    description: ''
  })
  const [featFormValues, setFeatFormValues] = useState({
    type: '',
    bodyPart: '',
    intensity: 0,
    description: '',
    image: ''
  })
  const [emoji, setEmoji] = useState('')
  const [active, setActive] = useState(false)
  const [reRender, setReRender] = useState(false)
  const [featEditing, setFeatEditing] = useState(false)
  const [updateText, setUpdateText] = useState('Edit Feat')
  const [commentEditing, setCommentEditing] = useState(false)
  const [updateComText, setUpdateComText] = useState('Edit Comment')

  const displayCreateForm = () => {
    formDisplay === 'none' ? setFormDisplay('flex') : setFormDisplay('none')
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

  const displayEditFeat = () => {
    if (!featEditing) {
      setFeatEditing(true)
      setUpdateText('Cancel')
    } else {
      setFeatEditing(false)
      setUpdateText('Edit Feat')
    }
  }

  const displayEditCom = () => {
    if (!commentEditing) {
      setCommentEditing(true)
      setUpdateComText('Cancel')
    } else {
      setCommentEditing(false)
      setUpdateComText('Edit Feat')
    }
  }

  const showFeat = (feat) => {
    navigate(`/feats/deets/${feat.id}`)
  }

  const submitFeatForm = async (e, featId) => {
    e.preventDefault()
    if (!featEditing) {
      let formBody = { ...featFormValues, userId: Number(user.id) }
      const data = await PostFeat(formBody)
      console.log(data)
      setFeats(data)
    } else {
      const data = await UpdateFeat(featId, featFormValues)
      console.log(data)
      setFeats(data)
    }
    setFormDisplay('none')
    setFeatEditing(false)
    setReRender(true)
  }

  const submitCommentForm = async (e, id) => {
    e.preventDefault()
    if (!commentEditing) {
      let commentBody = {
        ...commentFormValues,
        // featId: Number(id),
        userId: Number(user.id)
      }
      const data = await PostComment(id, commentBody)
      console.log(data)
      setComments(data)
    } else {
      const data = await UpdateComment(id, commentFormValues)
      console.log(data)
      setComments(data)
    }
    setFormDisplay('none')
    setCommentEditing(false)
    setReRender(true)
  }

  const deleteUserFeat = async (featId) => {
    let res = await DeleteFeat(featId)
    console.log(res)
    setReRender(true)
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
                formDisplay={formDisplay}
                emoji={emoji}
                reRender={reRender}
                user={user}
                featEditing={featEditing}
                updateText={updateText}
                setFeats={setFeats}
                updateFeatFormValues={updateFeatFormValues}
                displayCreateForm={displayCreateForm}
                submitFeatForm={submitFeatForm}
                setReRender={setReRender}
                showFeat={showFeat}
                displayEditFeat={displayEditFeat}
                deleteUserFeat={deleteUserFeat}
                setActive={setActive}
                setFormDisplay={setFormDisplay}
                setFeatFormValues={setFeatFormValues}
              />
            }
          />
          <Route
            path="/profile/:username"
            element={
              <Profile
                user={user}
                feats={feats}
                active={active}
                featFormValues={featFormValues}
                formDisplay={formDisplay}
                emoji={emoji}
                reRender={reRender}
                featEditing={featEditing}
                updateText={updateText}
                updateFeatFormValues={updateFeatFormValues}
                setActive={setActive}
                setFormDisplay={setFormDisplay}
                displayCreateForm={displayCreateForm}
                submitFeatForm={submitFeatForm}
                setReRender={setReRender}
                showFeat={showFeat}
                displayEditFeat={displayEditFeat}
                deleteUserFeat={deleteUserFeat}
                setFeatFormValues={setFeatFormValues}
              />
            }
          />
          <Route
            path="/feats/deets/:featId"
            element={
              <FeatDetails
                user={user}
                feats={feats}
                active={active}
                featFormValues={featFormValues}
                formDisplay={formDisplay}
                emoji={emoji}
                reRender={reRender}
                updateComText={updateComText}
                updateFeatFormValues={updateFeatFormValues}
                setActive={setActive}
                setFormDisplay={setFormDisplay}
                displayCreateForm={displayCreateForm}
                submitFeatForm={submitFeatForm}
                setReRender={setReRender}
                submitCommentForm={submitCommentForm}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
