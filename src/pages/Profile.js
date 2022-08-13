import { useState, useEffect } from 'react'

import { ChangePassword } from '../services/AuthReq'

import FeatCard from '../components/FeatCard'
import FeatForm from '../components/FeatForm'

const Profile = ({ feats, user }) => {
  const [userFeats, setUserFeats] = useState(null)
  const [passwordEditing, setPasswordEditing] = useState(false)
  const [passwordFormValues, setPasswordFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    username: user.username
  })
  const [success, setSuccess] = useState('') // consider use case for this
  const [infoDisplay, setInfoDisplay] = useState('flex')
  const [passwordFormDisplay, setPasswordFormDisplay] = useState('none')
  const [featFormDisplay, setFeatFormDisplay] = useState('none')
  const [featFormValues, setFeatFormValues] = useState({
    type: '',
    bodyPart: '',
    intensity: 0,
    description: '',
    image: ''
  })
  const [emoji, setEmoji] = useState('')

  const renderPasswordEditing = () => {
    if (!passwordEditing) {
      setPasswordEditing(true)
      setInfoDisplay('none')
      setPasswordFormDisplay('flex')
    } else {
      setPasswordEditing(false)
      setInfoDisplay('flex')
      setPasswordFormDisplay('none')
    }
  }

  const updatePasswordValues = (e) => {
    setPasswordFormValues({
      ...passwordFormValues,
      [e.target.name]: e.target.value
    })
  }

  const submitNewPassword = async (e) => {
    e.preventDefault()
    const res = await ChangePassword(passwordFormValues)
    setSuccess(res.msg)
    setPasswordFormValues({
      ...passwordFormValues,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
    setPasswordEditing(false)
    setInfoDisplay('flex')
    setPasswordFormDisplay('none')
  }

  const toggleFeatFormDisplay = () => {
    featFormDisplay === 'none'
      ? setFeatFormDisplay('flex')
      : setFeatFormDisplay('none')
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
  }

  useEffect(() => {
    if (feats) {
      const getUserFeats = feats.filter((feat) => feat.userId === user.id)
      setUserFeats(getUserFeats)
    } else {
      setUserFeats('Share a Feat!')
    }
  }, [])

  return (
    <main>
      <section id="user-info-container">
        <div id="user-info" style={{ display: `${infoDisplay}` }}>
          <h2>{user.username}</h2>
          <h3>{user.email}</h3>
          <h3>{user.location}</h3>
        </div>
        <form
          id="user-info-form"
          style={{ display: `${passwordFormDisplay}` }}
          onSubmit={(e) => submitNewPassword(e)}
        >
          <input
            type="password"
            name="oldPassword"
            value={passwordFormValues.oldPassword}
            onInput={updatePasswordValues}
            required
          />
          <input
            type="password"
            name="newPassword"
            value={passwordFormValues.newPassword}
            onInput={updatePasswordValues}
            required
          />
          <input
            type="password"
            name="confirmNewPassword"
            value={passwordFormValues.confirmNewPassword}
            onInput={updatePasswordValues}
            required
          />
          <button
            type="submit"
            disabled={
              !passwordFormValues.oldPassword ||
              !passwordFormValues.newPassword ||
              !passwordFormValues.confirmNewPassword ||
              passwordFormValues.newPassword !==
                passwordFormValues.confirmNewPassword
            }
          >
            Submit
          </button>
        </form>
        <button onClick={renderPasswordEditing}>Change Password</button>
      </section>
      <section id="user-feats">
        <button onClick={toggleFeatFormDisplay}>Share Feat!</button>
        <h1 style={{ display: `${featFormDisplay}` }}>this works</h1>
        {/* <FeatForm style={{ display: `${featFormDisplay}` }} /> */}
        {userFeats?.map((feat) => (
          <FeatCard feat={feat} key={feat.id} />
        ))}
      </section>
    </main>
  )
}

export default Profile
