import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginUser } from '../services/Auth'

const Login = ({ setUser }) => {
  const [loginValues, setLoginValues] = useState({ username: '', password: '' })
  let navigate = useNavigate()

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

  return <div></div>
}

export default Login
