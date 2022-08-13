import { useState } from 'react'

const Profile = ({ feats, user }) => {
  const [passwordFormValues, setPasswordFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const userFeats = feats.filter((feat) => {
    feat.userId === user.id
  })
  return (
    <main>
      <section id="user-info-container">
        <div id="user-info">
          <h2>{user.username}</h2>
          <h3>{user.email}</h3>
          <h3>{user.location}</h3>
        </div>
        <form id="user-info-form">
          <input
            type="password"
            name="oldPassword"
            value={passwordFormValues.oldPassword}
          />
          <input
            type="password"
            name="newPassword"
            value={passwordFormValues.newPassword}
          />
          <input
            type="password"
            name="confirmNewPassword"
            value={passwordFormValues.confirmNewPassword}
          />
        </form>
        <button>Change Password</button>
      </section>
      <section id="user-feats"></section>
    </main>
  )
}

export default Profile
