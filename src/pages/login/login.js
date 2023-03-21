import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../register/register.css'
import { useAppContext } from '../../context/appContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
import {
  SERVER_BASE_URL,
  START_SPINNER,
  STOP_SPINNER,
} from '../../context/globalConstants'

const GOOGLE_CLIENT_ID =
  '1090090266803-m8vlo8s7h6tapjjf3heu46pt5pokdr4t.apps.googleusercontent.com'

function Login() {
  const { dispatch, setTokenAndUserToLocalStorage, user } = useAppContext()

  const [password, showPassword] = useState(false)

  const [inputUser, setInputUser] = useState({
    email: '',
    password: '',
  })

  const handleInput = (e) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: START_SPINNER })

    try {
      const res = await axios.post(`${SERVER_BASE_URL}/login`, inputUser)

      const { token, user } = res.data

      setTokenAndUserToLocalStorage(token, user)
      toast.success(`${user.name} logged in succesfully`)

      console.log(res.data)
    } catch (error) {
      toast.error(`${error.response.data.message}`)
      console.log(error.response)
    }
    dispatch({ type: STOP_SPINNER })
  }

  const googleResSuccess = async (resFromGoogle) => {
    dispatch({ type: START_SPINNER })

    console.log(resFromGoogle)
    const res = await axios.post(
      `${SERVER_BASE_URL}/googleLogin`,
      resFromGoogle
    )

    const { token, user } = res.data

    setTokenAndUserToLocalStorage(token, user)
    toast.success(`${user.name} logged in succesfully`)

    console.log(res)

    dispatch({ type: STOP_SPINNER })
  }

  const googleResFailure = (response) => {
    console.log('google error client', response)
  }

  return (
    <>
      <div className="wrapper">
        {/* for background image blur */}
        <div className="login-wrapper"></div>
        <div className="login-page">
          <form
            className="login-form"
            id="login-form"
            name="login-form"
            onSubmit={handleSubmit}
          >
            <h1>Login</h1>
            <div className="login-creds">
              <label htmlFor="">email</label>
              <input
                required={true}
                autoComplete="off"
                onChange={handleInput}
                value={inputUser.email}
                type="email"
                name="email"
                style={{ marginBottom: '.8rem' }}
              />

              <div className="login-password">
                <label htmlFor="">password</label>
                <div className="login-password">
                  <input
                    autoComplete="off"
                    required={true}
                    onChange={handleInput}
                    value={inputUser.password}
                    type={password ? 'text' : 'password'}
                    name="password"
                  />
                  <i
                    class={`fa fa-eye login-eye ${password && 'login-yellow'}`}
                    aria-hidden="true"
                    onClick={() => showPassword(!password)}
                  ></i>
                </div>
              </div>
              <button className="btn login-btn" form="login-form" type="submit">
                login
              </button>

              <div className="login-links">
                <div className="auth-redirect">
                  <p
                    style={{
                      color: 'var(--grey1)',
                      textTransform: 'capitalize',
                    }}
                  >
                    not a user yet?
                  </p>
                  <Link to="/register" className="login-link">
                    Register
                  </Link>
                </div>
                <Link to="/home" id="skip">
                  skip
                </Link>
              </div>
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={googleResSuccess}
                onFailure={googleResFailure}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
