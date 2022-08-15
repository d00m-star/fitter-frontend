import { useState, useEffect } from 'react'

import { ChangePassword, UpdateFeat } from '../services/AuthReq'

import FeatCard from '../components/FeatCard'
import FeatForm from '../components/FeatForm'

const Profile = ({
  feats,
  user,
  active,
  featFormValues,
  formDisplay,
  updateFeatFormValues,
  displayCreateForm,
  submitFeatForm,
  emoji,
  reRender,
  setReRender,
  setActive,
  setFormDisplay,
  setFeatFormValues
}) => {
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

  ///////// update feat > app.js////////////////

  const [featEditing, setFeatEditing] = useState(false)
  const [updateText, setUpdateText] = useState('Update Feat')

  const displayEditFeat = () => {
    if (!featEditing) {
      setFeatEditing(true)
      setUpdateText('Cancel')
    } else {
      setFeatEditing(false)
      setUpdateText('Update Feat')
    }
  }

  const submitFeatForm = async (e) => {
    e.preventDefault()
    if (!featEditing) {
      setFeatFormValues({ ...featFormValues, userId: Number(user.id) })
      const data = await PostFeat(featFormValues)
      console.log(data)
      setFeats(data)
    } else {
      const data = await UpdateFeat(featFormValues)
      console.log(data)
      setFeats(data)
    }
    setFormDisplay('none')
    setFeatEditing(false)
    setReRender(true)
  }

  /////////////////////////////////////////

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

  useEffect(() => {
    if (feats) {
      const getUserFeats = feats.filter((feat) => feat.userId === user.id)
      setUserFeats(getUserFeats)
    } else {
      setUserFeats('Share a Feat!')
    }
    setActive(false)
    setFormDisplay('none')
    setReRender(false)
  }, [reRender])

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
        <button onClick={displayCreateForm} disabled={active}>
          Share Feat!
        </button>
        <div style={{ display: `${formDisplay}` }}>
          <FeatForm
            displayCreateForm={displayCreateForm}
            featFormValues={featFormValues}
            updateFeatFormValues={updateFeatFormValues}
            submitFeatForm={submitFeatForm}
            emoji={emoji}
          />
        </div>
        <div>
          {userFeats?.reverse().map((feat) => {
            if (!featEditing) {
              return <FeatCard feat={feat} key={feat.id} />
            } else {
              setFeatFormValues({
                ...featFormValues,
                type: feat.type,
                bodyPart: feat.bodyPart,
                intensity: feat.intensity,
                description: feat.description
              })
              return (
                <FeatForm
                  featFormValues={featFormValues}
                  featEditing={featEditing}
                />
              )
            }
          })}
          <button onClick={displayEditFeat}>{updateText}</button>
        </div>
      </section>
    </main>
  )
}

export default Profile
