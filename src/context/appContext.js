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
  GET_HOMEPAGE_TWEETS_START,
  GET_HOMEPAGE_TWEETS_SUCCESS,
  GET_HOMEPAGE_TWEETS_ERROR,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  START_SPINNER,
  STOP_SPINNER,
} from './globalConstants'

import reducer from './reducer'

const user = JSON.parse(localStorage.getItem('user'))
const accessToken = JSON.parse(localStorage.getItem('accessToken'))

const initialState = {
  user: user,
  accessToken: accessToken,
  configs: {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
  isLoggedIn: user ? true : false,
  isLoading: false,
  isWaiting: false,
  status: 'follow',
  category: 'news',
  trends: {},
  searchText: '',
  displayItems: [
    'bhavin',
    'kiran',
    'sheth',
    'bhavin',
    'kiran',
    'sheth',
    'bhavin',
    'kiran',
    'sheth',
    'bhavin',
    'kiran',
    'sheth',
  ],
  allItems: [
    'bhavin',
    'kiran',
    'sheth',
    'bhavin',
    'kiran',
    'sheth',
    'bhavin',
    'kiran',
    'sheth',
    'bhavin',
    'kiran',
    'sheth',
    'bhavin',
    'kiran',
    'sheth',
    'bhavin',
    'kiran',
    'sheth',
  ],
  homePageTweets: [],
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
      dispatch({
        type: USER_SETUP_SUCCESS,
        payload: { accessToken, user },
      })
    } else {
      dispatch({ type: USER_SETUP_ERROR })
      // toast.error('something went wrong during intial setup')
    }
    console.log('access token and user set succesfully', state)
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

  const getHomePageTweets = async () => {
    dispatch({ type: GET_HOMEPAGE_TWEETS_START })
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/home`)
      const { data } = res
      dispatch({ type: GET_HOMEPAGE_TWEETS_SUCCESS, payload: { data } })
      console.log(res)
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
      console.log(error)
      dispatch({ type: GET_HOMEPAGE_TWEETS_ERROR })
    }
  }

  const setupApp = () => {
    dispatch({ type: USER_SETUP_START })
    console.log('setup started', state.isLoading)
    getTokenAndUserFromLocalStorage()
  }

  const getUserProfile = async (username) => {
    dispatch({ type: GET_USER_PROFILE_START })
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/${username}`)
      console.log('in user profile', res.data)
      const { data } = res
      dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: { data } })
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)

      dispatch({ type: GET_USER_PROFILE_ERROR })
    }
  }

  useEffect(() => {
    // setupApp()
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
        getHomePageTweets,
        getUserProfile,
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
