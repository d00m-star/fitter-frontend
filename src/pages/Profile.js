import { useState, useEffect } from 'react'

import FeatCard from '../components/FeatCard'
import FeatForm from '../components/FeatForm'

import { ChangePassword } from '../services/AuthReq'
import { GetUserFeats } from '../services/FeatReq'

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
  setFeatFormValues,
  featEditing,
  updateText,
  displayEditFeat,
  deleteUserFeat,
  checkToken,
  selectedFeat
}) => {
  const [userFeats, setUserFeats] = useState(null)
  const [passwordEditing, setPasswordEditing] = useState(false)
  const [passwordFormValues, setPasswordFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [success, setSuccess] = useState('') // consider use case for this
  const [infoDisplay, setInfoDisplay] = useState('flex')
  const [passwordFormDisplay, setPasswordFormDisplay] = useState('none')

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
    let passwordBody = {
      ...passwordFormValues,
      username: user.username
    }
    const res = await ChangePassword(passwordBody)
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

  const renderUserFeats = async (userId) => {
    const res = await GetUserFeats(userId)
    if (res.length > 0) {
      setUserFeats(
        res.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1
          }
          if (a.createdAt < b.createdAt) {
            return 1
          }
          return 0
        })
      )
    } else {
      setUserFeats(null)
    }
  }

  useEffect(() => {
    user && renderUserFeats(user.id)
    setActive(false)
    setFormDisplay('none')
    setReRender(false)
  }, [reRender, !user])

  return (
    <main>
      {user ? (
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
      ) : (
        <h1>Loading Profile</h1>
      )}
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
            checkToken={checkToken}
            selectedFeat={selectedFeat}
          />
        </div>
        <div>
          {userFeats ? (
            userFeats.map((feat) => (
              <div key={feat.id}>
                {!featEditing ? (
                  <FeatCard feat={feat} />
                ) : selectedFeat.id === feat.id ? (
                  <FeatForm
                    feat={feat}
                    featFormValues={featFormValues}
                    featEditing={featEditing}
                    updateFeatFormValues={updateFeatFormValues}
                    submitFeatForm={submitFeatForm}
                    emoji={emoji}
                    setFeatFormValues={setFeatFormValues}
                    selectedFeat={selectedFeat}
                  />
                ) : (
                  <FeatCard feat={feat} />
                )}
                <button onClick={() => displayEditFeat(feat)}>
                  {updateText}
                </button>
                <button onClick={() => deleteUserFeat(feat.id)}>X</button>
              </div>
            ))
          ) : (
            // .sort((a, b) => {
            //   if (a.createdAt > b.createdAt) {
            //     return 1
            //   }
            //   if (a.createdAt < b.createdAt) {
            //     return -1
            //   }
            //   return 0
            // })
            <h2>Share a Feat!</h2>
          )}
        </div>
      </section>
    </main>
  )
}

export default Profile
