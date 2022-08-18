import { useState, useEffect } from 'react'

import FeatCard from '../components/FeatCard'
import FeatForm from '../components/FeatForm'

import { ChangePassword } from '../services/AuthReq'
import { GetUserFeats } from '../services/FeatReq'

const Profile = ({
  active,
  addFeatLike,
  deleteUserFeat,
  displayCreateForm,
  displayEditFeat,
  editing,
  emoji,
  featFormValues,
  feats,
  formDisplay,
  handleImage,
  img,
  preview,
  removeFeatLike,
  reRender,
  selectedFeat,
  setActive,
  setFeatFormValues,
  setFormDisplay,
  setImg,
  setPreview,
  setReRender,
  showFeat,
  submitFeatForm,
  updateFeatFormValues,
  updateText,
  user
}) => {
  const [userFeats, setUserFeats] = useState(null)
  const [passwordEditing, setPasswordEditing] = useState(false)
  const [passwordFormValues, setPasswordFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
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
      setUserFeats(res)
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
            <label>Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              value={passwordFormValues.oldPassword}
              onInput={updatePasswordValues}
              required
            />
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={passwordFormValues.newPassword}
              onInput={updatePasswordValues}
              required
            />
            <label>Confirm New Password:</label>
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
              className="btn"
              id="fc-pass-submit-button"
            >
              Submit
            </button>
          </form>
          <button
            onClick={renderPasswordEditing}
            className="btn"
            id="fc-changepass-button"
          >
            Change Password
          </button>
        </section>
      ) : (
        <h1>Loading Profile</h1>
      )}
      <section id="user-feats">
        <button
          onClick={displayCreateForm}
          disabled={active}
          className="btn"
          id="fc-share-button"
        >
          Share Feat!
        </button>
        <div style={{ display: `${formDisplay}` }}>
          <FeatForm
            displayCreateForm={displayCreateForm}
            featFormValues={featFormValues}
            updateFeatFormValues={updateFeatFormValues}
            submitFeatForm={submitFeatForm}
            emoji={emoji}
            selectedFeat={selectedFeat}
            handleImage={handleImage}
            img={img}
            preview={preview}
            setPreview={setPreview}
            setImg={setImg}
          />
        </div>
        <div>
          {userFeats ? (
            userFeats.map((feat) => (
              <div key={feat.id}>
                {editing && selectedFeat.id === feat.id ? (
                  <FeatForm
                    editing={editing}
                    emoji={emoji}
                    feat={feat}
                    featFormValues={featFormValues}
                    handleImage={handleImage}
                    img={img}
                    preview={preview}
                    selectedFeat={selectedFeat}
                    setFeatFormValues={setFeatFormValues}
                    setImg={setImg}
                    setPreview={setPreview}
                    submitFeatForm={submitFeatForm}
                    updateFeatFormValues={updateFeatFormValues}
                  />
                ) : (
                  <FeatCard
                    addFeatLike={addFeatLike}
                    feat={feat}
                    removeFeatLike={removeFeatLike}
                    reRender={reRender}
                    setReRender={setReRender}
                    showFeat={showFeat}
                    user={user}
                  />
                )}
                <button
                  onClick={() => displayEditFeat(feat)}
                  className="btn"
                  id="fc-edit-button"
                >
                  {updateText}
                </button>
                <button
                  onClick={() => deleteUserFeat(feat.id)}
                  className="btn"
                  id="fc-delete-button"
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <h2>Share a Feat!</h2>
          )}
        </div>
      </section>
    </main>
  )
}

export default Profile
