import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'
import axios from 'axios'
import { useAppContext } from '../../context/appContext'
import { toast } from 'react-toastify'
import {
  START_SPINNER,
  STOP_SPINNER,
  SERVER_BASE_URL,
} from '../../context/globalConstants'

function Register() {
  const [password, showPassword] = useState(false)

  const { dispatch, setTokenAndUserToLocalStorage } = useAppContext()

  const [inputUser, setInputUser] = useState({
    name: '',
    userName: '',
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
      const res = await axios.post(`${SERVER_BASE_URL}/register`, inputUser)

      toast.success(`${inputUser.name} registered succesfully`)

      const { token, user } = res.data

      setTokenAndUserToLocalStorage(token, user)

      console.log(res.data)
    } catch (error) {
      toast.error(`${error.response.data.message}`)
      console.log(error.response.data)
    }
    dispatch({ type: STOP_SPINNER })
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
            <h1>Register</h1>
            <div className="login-creds">
              <label htmlFor="">name</label>
              <input
                required={true}
                autoComplete="off"
                onChange={handleInput}
                value={inputUser.name}
                type="text"
                name="name"
                style={{ marginBottom: '.8rem' }}
              />

              <label htmlFor="">username</label>
              <input
                required={true}
                autoComplete="off"
                onChange={handleInput}
                value={inputUser.userName}
                type="text"
                name="userName"
                style={{ marginBottom: '.8rem' }}
              />

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
                register
              </button>

              <div className="login-links">
                <div className="auth-redirect">
                  <p
                    style={{
                      color: 'var(--grey1)',
                      textTransform: 'capitalize',
                    }}
                  >
                    already a user?
                  </p>
                  <Link to="/login" className="login-link">
                    Login
                  </Link>
                </div>
                <Link to="/home" id="skip">
                  skip
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
