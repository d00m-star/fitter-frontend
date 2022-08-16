import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignUpUser, LoginUser } from '../services/AuthReq'

import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'

const Home = ({ user, setUser, signUp, setSignUp, upOrIn, setUpOrIn }) => {
  const [signUpValues, setSignUpValues] = useState({
    name: '',
    age: '',
    location: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loginValues, setLoginValues] = useState({ username: '', password: '' })
  const [rotate, setRotate] = useState(false)
  let navigate = useNavigate()

  const rotating = () => {
    setRotate((rotated) => !rotated)
  }

  const changeUpOrIn = async () => {
    if (signUp) {
      setSignUp(false)
      setUpOrIn('Sign Up')
      rotating()
      // setRotate(true)
    } else {
      setSignUp(true)
      setUpOrIn('Login')
      rotating()
      // setRotate(true)
    }
  }

  const updateSignUpValues = (e) => {
    setSignUpValues({ ...signUpValues, [e.target.name]: e.target.value })
  }

  const submitSignUp = async (e) => {
    e.preventDefault()
    if (
      signUpValues.password !== '' &&
      signUpValues.password === signUpValues.confirmPassword
    ) {
      await SignUpUser(signUpValues)
      setSignUpValues({
        name: '',
        age: '',
        location: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      changeUpOrIn()
    }
  }

  const updateLoginValues = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value })
  }

  const submitLogin = async (e) => {
    e.preventDefault()
    const payload = await LoginUser(loginValues)
    setUser(payload)
    setLoginValues({ username: '', password: '' })
    navigate('/feed')
  }

  return (
    <div id="home-form-container">
      <div
        id="home-form-container-inner"
        // style={{ transform: `rotateY(${rotate})` }}
        className={`${rotate ? 'rotated' : ''}`}
      >
        {/* {signUp ? ( */}
        <div className="sign">
          <SignUpForm
            signUpValues={signUpValues}
            updateSignUpValues={updateSignUpValues}
            submitSignUp={submitSignUp}
          />
        </div>
        {/* ) : ( */}
        <div className="log">
          <LoginForm
            loginValues={loginValues}
            updateLoginValues={updateLoginValues}
            submitLogin={submitLogin}
          />
        </div>
        <div className="button">
          <button
            disabled={user}
            // className="btn"
            onClick={changeUpOrIn}
            className={`${rotate ? 'rotated' : ''}`}
            display="relative"
          >
            {upOrIn}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
