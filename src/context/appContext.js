import axios from 'axios'
import React, { useReducer, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  GET_TRENDS_ERROR,
  GET_TRENDS_START,
  GET_TRENDS_SUCCESS,
  SERVER_BASE_URL,
  USER_SETUP_ERROR,
  USER_SETUP_SUCCESS,
  USER_SETUP_START,
} from './globalConstants'

import reducer from './reducer'

const initialState = {
  user: undefined,
  isLoggedIn: false,
  isLoading: false,
  category: 'news',
  trends: {},
  count: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // const [navState, setNavState] = useState('home')
  const [state, dispatch] = useReducer(reducer, initialState)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const getTokenAndUserFromLocalStorage = () => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const user = JSON.parse(localStorage.getItem('user'))

    if (accessToken && user) {
      console.log('aces token and user set succesfuly')
      const isloggedIn = true
      dispatch({
        type: USER_SETUP_SUCCESS,
        payload: { accessToken, user },
      })
    } else {
      dispatch({ type: USER_SETUP_ERROR })
      // toast.error('something went wrong during intial setup')
    }
  }

  const setTokenAndUserToLocalStorage = (token, user) => {
    localStorage.setItem('accessToken', JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(user))
    getTokenAndUserFromLocalStorage()
  }

  // const setupUser = (user) => {
  //   dispatch({ type: SETUP_USER, payload: user })
  // }

  const getTrends = async (category) => {
    dispatch({ type: GET_TRENDS_START, payload: { category } })
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/explore/tabs/${category}`)
      const { data } = res
      dispatch({ type: GET_TRENDS_SUCCESS, payload: { data } })
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
      dispatch({ type: GET_TRENDS_ERROR })
    }
  }

  const setupApp = () => {
    dispatch({ type: USER_SETUP_START })
    getTokenAndUserFromLocalStorage()
  }

  useEffect(() => {
    console.log(
      'context rendeered',
      'in appProvider useffect logged in : ',
      state.isLoggedIn
    )

    setupApp()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })

    return () => {
      window.removeEventListener('resize')
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        // navState,
        // setNavState,
        screenWidth,
        getTrends,
        setTokenAndUserToLocalStorage,
        dispatch,
        // increaseCount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
