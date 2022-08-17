import { useState, useEffect, useCallback } from 'react'
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

  //////// user and feat values
  const [user, setUser] = useState(null)
  const [feats, setFeats] = useState(null)

  ////////specific feat or comment
  const [selectedFeat, setSelectedFeat] = useState({
    id: 0
  })
  const [selectedComment, setSelectedComment] = useState({
    id: 0
  })

  //////// condition toggles
  const [signUp, setSignUp] = useState(true) ///// only value starting true
  const [active, setActive] = useState(false)
  const [reRender, setReRender] = useState(false)
  const [editing, setEditing] = useState(false)

  /////// forms
  const [commentFormValues, setCommentFormValues] = useState({
    description: '' //////// either blank, or filled by selectedComment
  })
  const [featFormValues, setFeatFormValues] = useState({
    type: '', /////// all fields either blank or filled by selectedFeat
    bodyPart: '',
    intensity: 0,
    description: '',
    image: ''
  })

  /////// text due to toggle state
  const [upOrIn, setUpOrIn] = useState('Login')
  const [formDisplay, setFormDisplay] = useState('none')
  const [emoji, setEmoji] = useState('')
  const [updateText, setUpdateText] = useState('Edit Feat')
  const [updateComText, setUpdateComText] = useState('Edit Comment')

  const displayCreateForm = () => {
    formDisplay === 'none' ? setFormDisplay('flex') : setFormDisplay('none')
    !active ? setActive(true) : setActive(false)
    // setReRender(true)
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

  const displayEditFeat = (feat) => {
    if (!editing) {
      setEditing(true)
      setUpdateText('Cancel')
      setSelectedFeat(feat)
    } else {
      setEditing(false)
      setUpdateText('Edit Feat')
    }
  }

  const displayEditCom = (comment) => {
    if (!editing) {
      setEditing(true)
      setUpdateComText('Cancel')
      setSelectedComment(comment)
    } else {
      setEditing(false)
      setUpdateComText('Edit Comment')
    }
  }

  const showFeat = (feat) => {
    navigate(`/feats/deets/${feat.id}`)
  }

  const submitFeatForm = async (e, featId) => {
    e.preventDefault()
    if (!editing) {
      let formBody = { ...featFormValues, userId: Number(user.id) }
      const data = await PostFeat(formBody)
      console.log(data)
    } else {
      const data = await UpdateFeat(featId, featFormValues)
      console.log(data)
    }
    setFeatFormValues({
      type: '',
      bodyPart: '',
      intensity: 0,
      description: '',
      image: ''
    })
    setFormDisplay('none')
    setEditing(false)
    setReRender(true)
    setUpdateText('Edit Feat')
  }

  const submitCommentForm = async (e, id) => {
    e.preventDefault()
    if (!editing) {
      let commentBody = {
        ...commentFormValues,
        // featId: Number(id),
        userId: Number(user.id)
      }
      const data = await PostComment(id, commentBody)
      console.log(data)
    } else {
      const data = await UpdateComment(id, commentFormValues)
      console.log(data)
    }
    setFormDisplay('none')
    setEditing(false)
    setReRender(true)
    setUpdateComText('Edit Comment')
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
    setSignUp(true)
    setUpOrIn('Login')
  }

  const checkToken = async () => {
    const userCheck = await CheckSession()
    setUser(userCheck)
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
                editing={editing}
                updateText={updateText}
                selectedFeat={selectedFeat}
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
                editing={editing}
                updateText={updateText}
                selectedFeat={selectedFeat}
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
                editing={editing}
                selectedComment={selectedComment}
                updateFeatFormValues={updateFeatFormValues}
                setActive={setActive}
                setFormDisplay={setFormDisplay}
                displayCreateForm={displayCreateForm}
                submitFeatForm={submitFeatForm}
                setReRender={setReRender}
                submitCommentForm={submitCommentForm}
                setEditing={setEditing}
                displayEditCom={displayEditCom}
                setSelectedComment={setSelectedComment}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
