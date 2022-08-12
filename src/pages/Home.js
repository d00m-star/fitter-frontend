import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignUpUser, LoginUser } from '../services/Auth'

import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'

const Home = ({ setUser }) => {
  const [signUp, setSignUp] = useState(true)
  const [upOrIn, setUpOrIn] = useState('Login')
  const [signUpValues, setSignUpValues] = useState({ name: '', age: '', location: '', username: '', email: '', password: '', confirmPassword: '' })
  const [loginValues, setLoginValues] = useState({ username: '', password: '' })
  let navigate = useNavigate()

  const changeUpOrIn = () => {
    if (signUp) {
      setSignUp(false)
      setUpOrIn('Sign Up')
    } else {
      setSignUp(true)
      setUpOrIn('Login')
    }
  }

  const updateSignUpValues = (e) => {
    setSignUpValues({ ...loginValues, [e.target.id]: e.target.value })
  }

  const submitSignUp = (e) => {
    e.preventDefault()
    await SignUpUser(signUpValues)
    setSignUpValues({ name: '', age: '', location: '', username: '', email: '', password: '', confirmPassword: '' })
    setSignUp(false)
  }

  const updateLoginValues = (e) => {
    setLoginValues({ ...loginValues, [e.target.id]: e.target.value })
    ///////////////////////// consider name here instead of id
  }

  const submitLogin = async (e) => {
    e.preventDefault()
    const payload = await LoginUser(loginValues)
    setLoginValues({ username: '', password: '' })
    navigate('/feed')
  }

  return (
    <div>
      <main>
        {signUp ? (
          <SignUpForm signUpValues={signUpValues} updateSignUpValues={updateSignUpValues} submitSignUp={submitSignUp} />
        ) : (
          <LoginForm
            loginValues={loginValues}
            updateLoginValues={updateLoginValues}
            submitLogin={submitLogin}
          />
        )}
      </main>
      <button onClick={changeUpOrIn}>{upOrIn}</button>
    </div>
  )
}

export default Home
