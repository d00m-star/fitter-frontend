import { useState, useEffect } from 'react'

import { ChangePassword } from '../services/AuthReq'

import FeatCard from '../components/FeatCard'

const Profile = ({ feats, user }) => {
  const [userFeats, setUserFeats] = useState(null)
  const [passwordEditing, setPasswordEditing] = useState(false)
  const [passwordFormValues, setPasswordFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    username: user.username
  })
  const [success, setSuccess] = useState('')
  const [infoDisplay, setInfoDisplay] = useState('flex')
  const [passwordFormDisplay, setPasswordFormDisplay] = useState('none')

  useEffect(() => {
    if (feats) {
      const getUserFeats = feats.filter((feat) => feat.userId === user.id)
      setUserFeats(getUserFeats)
    } else {
      setUserFeats('Share a Feat!')
    }
  }, [])

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
        {userFeats?.map((feat) => (
          <FeatCard feat={feat} key={feat.id} />
        ))}
      </section>
    </main>
  )
}

export default Profile
