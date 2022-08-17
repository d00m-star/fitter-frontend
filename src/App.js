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
import {
  DeleteCommentLike,
  DeleteFeatLike,
  PostFeatLike,
  PostCommentLike
} from './services/LikeReq'

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
  const [img, setImg] = useState(null)
  const [preview, setPreview] = useState()

  /////// text due to toggle state
  const [upOrIn, setUpOrIn] = useState('Login')
  const [formDisplay, setFormDisplay] = useState('none')
  const [emoji, setEmoji] = useState('')
  const [updateText, setUpdateText] = useState('Edit Feat')
  const [updateComText, setUpdateComText] = useState('Edit Comment')

  ////// display forms
  const displayCreateForm = () => {
    formDisplay === 'none' ? setFormDisplay('flex') : setFormDisplay('none')
    !active ? setActive(true) : setActive(false)
    // setReRender(true)
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

  //////// update form values

  const updateCommentFormValues = (e) => {
    setCommentFormValues({
      ...commentFormValues,
      [e.target.id]: e.target.value
    })
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

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImg(file)
    } else {
      setImg(null)
    }
    console.log(file)
    console.log({ img })
  }

  /////// submit form
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

  ////// post requests
  // const updateFeatLike = async (featId) => {

  // }
  const addFeatLike = async (featId) => {
    let res = await PostFeatLike(featId)
    console.log(res)
    setReRender(true)
  }

  const addCommentLike = async (commentId) => {
    let res = await PostCommentLike(commentId)
    console.log(res)
    setReRender(true)
  }

  ////// delete requests
  const deleteUserFeat = async (featId) => {
    let res = await DeleteFeat(featId)
    console.log(res)
    setReRender(true)
  }

  const removeFeatLike = async (featId) => {
    let res = await DeleteFeatLike(featId)
    console.log(res)
    setReRender(true)
  }

  const removeCommentLike = async (commentId) => {
    let res = await DeleteCommentLike(commentId)
    console.log(res)
    setReRender(true)
  }

  ////// logout/navigate away
  const showFeat = (feat) => {
    navigate(`/feats/deets/${feat.id}`)
  }

  const logout = () => {
    setUser(null)
    setFeats(null)
    localStorage.clear()
    setSignUp(true)
    setUpOrIn('Login')
  }

  //////// session check
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
                active={active}
                addFeatLike={addFeatLike}
                displayCreateForm={displayCreateForm}
                displayEditFeat={displayEditFeat}
                deleteUserFeat={deleteUserFeat}
                emoji={emoji}
                editing={editing}
                feats={feats}
                featFormValues={featFormValues}
                formDisplay={formDisplay}
                handleImage={handleImage}
                img={img}
                preview={preview}
                removeFeatLike={removeFeatLike}
                reRender={reRender}
                selectedFeat={selectedFeat}
                setFeats={setFeats}
                submitFeatForm={submitFeatForm}
                setReRender={setReRender}
                showFeat={showFeat}
                setFormDisplay={setFormDisplay}
                setActive={setActive}
                setFeatFormValues={setFeatFormValues}
                user={user}
                setImg={setImg}
                setPreivew={setPreview}
                updateText={updateText}
                updateFeatFormValues={updateFeatFormValues}
              />
            }
          />
          <Route
            path="/profile/:username"
            element={
              <Profile
                active={active}
                addFeatLike={addFeatLike}
                deleteUserFeat={deleteUserFeat}
                displayEditFeat={displayEditFeat}
                displayCreateForm={displayCreateForm}
                emoji={emoji}
                editing={editing}
                feats={feats}
                featFormValues={featFormValues}
                formDisplay={formDisplay}
                handleImage={handleImage}
                img={img}
                preview={preview}
                removeFeatLike={removeFeatLike}
                reRender={reRender}
                selectedFeat={selectedFeat}
                setFormDisplay={setFormDisplay}
                setActive={setActive}
                submitFeatForm={submitFeatForm}
                setReRender={setReRender}
                showFeat={showFeat}
                setFeatFormValues={setFeatFormValues}
                setImg={setImg}
                setPreview={setPreview}
                user={user}
                updateText={updateText}
                updateFeatFormValues={updateFeatFormValues}
              />
            }
          />
          <Route
            path="/feats/deets/:featId"
            element={
              <FeatDetails
                active={active}
                addCommentLike={addCommentLike}
                addFeatLike={addFeatLike}
                commentFormValues={commentFormValues}
                displayCreateForm={displayCreateForm}
                displayEditCom={displayEditCom}
                emoji={emoji}
                editing={editing}
                feats={feats}
                featFormValues={featFormValues}
                formDisplay={formDisplay}
                removeCommentLike={removeCommentLike}
                removeFeatLike={removeFeatLike}
                reRender={reRender}
                selectedComment={selectedComment}
                setActive={setActive}
                setFormDisplay={setFormDisplay}
                submitFeatForm={submitFeatForm}
                setReRender={setReRender}
                submitCommentForm={submitCommentForm}
                setEditing={setEditing}
                setSelectedComment={setSelectedComment}
                user={user}
                updateComText={updateComText}
                updateFeatFormValues={updateFeatFormValues}
                updateCommentFormValues={updateCommentFormValues}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
