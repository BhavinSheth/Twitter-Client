import axios from 'axios'
import React, { useReducer, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  GET_TRENDS_END,
  GET_TRENDS_ERROR,
  GET_TRENDS_START,
  GET_TRENDS_SUCCESS,
  SERVER_BASE_URL,
  SETUP_USER,
  START_APP_SETUP,
} from './globalConstants'

import reducer from './reducer'

const initialState = {
  user: undefined,
  isLoading: false,
  isLoggedIn: false,
  category: '',
  trends: {},
  count: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // const [navState, setNavState] = useState('home')
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const getTokenAndUserFromLocalStorage = () => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const user = JSON.parse(localStorage.getItem('user'))

    dispatch({ type: SETUP_USER, payload: { accessToken, user } })
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

  // const setupApp = () => {
  //   dispatch({ type: START_APP_SETUP })
  // }

  useEffect(() => {
    console.log('context rendeered')
    getTokenAndUserFromLocalStorage()
    // window.addEventListener('resize', () => {
    //   setScreenWidth(window.innerWidth)
    // })

    // return () => {
    //   window.removeEventListener('resize')
    // }
    // setupApp()
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        // navState,
        // setNavState,
        // screenWidth,
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
