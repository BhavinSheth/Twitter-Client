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
  GET_PROFILE_OUTLET_START,
  GET_PROFILE_OUTLET_SUCCESS,
  GET_PROFILE_OUTLET_ERROR,
  PROFILE_OUTLET,
  LOGOUT_USER,
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
  profile: undefined,
  profileTweets: [],
  profileComments: [],
  profileLikes: [],
  profileFollowers: [],
  profileFollowing: [],
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
      toast.error(
        'something went wrong during intial setup',
        'color:yellow',
        accessToken,
        user
      )
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
      const res = await axios.post(`${SERVER_BASE_URL}/${username}`, {
        visitingUserId: state.user.userId,
      })
      console.info('%c in user profile', 'color:blue', res.data)
      const { data } = res
      dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: { data } })
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)

      dispatch({ type: GET_USER_PROFILE_ERROR })
    }
  }

  const getProfileTweets = async () => {
    dispatch({ type: GET_PROFILE_OUTLET_START })
    try {
      const res = await axios.get(
        `${SERVER_BASE_URL}/${state.profile.userName}/tweets`
      )
      const { tweets } = res.data
      console.log(tweets, 'get profile tweet')
      dispatch({
        type: GET_PROFILE_OUTLET_SUCCESS,
        payload: { tweets, outletType: PROFILE_OUTLET.profileTweets },
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
      dispatch({ type: GET_PROFILE_OUTLET_ERROR })
    }
  }

  const getProfileLikes = async () => {
    dispatch({ type: GET_PROFILE_OUTLET_START })
    try {
      const res = await axios.get(
        `${SERVER_BASE_URL}/${state.profile.userName}/likes`
      )
      const { liked } = res.data
      console.log(liked, 'get profile likes')
      dispatch({
        type: GET_PROFILE_OUTLET_SUCCESS,
        payload: { liked, outletType: PROFILE_OUTLET.profileLikes },
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
      dispatch({ type: GET_PROFILE_OUTLET_ERROR })
    }
  }

  const getProfileComments = async () => {
    dispatch({ type: GET_PROFILE_OUTLET_START })
    try {
      const res = await axios.get(
        `${SERVER_BASE_URL}/${state.profile.userName}/comments`
      )
      const { commented } = res.data
      console.log(res.data, 'get profile comments')
      dispatch({
        type: GET_PROFILE_OUTLET_SUCCESS,
        payload: { commented, outletType: PROFILE_OUTLET.profileComments },
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
      dispatch({ type: GET_PROFILE_OUTLET_ERROR })
    }
  }

  const getProfileFollowers = async () => {
    dispatch({ type: GET_PROFILE_OUTLET_START })
    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/${state.profile.userName}/followers`,
        { visitingUserId: state.user.userId }
      )
      const { followers } = res.data
      console.log(res.data, 'get profile followers')
      dispatch({
        type: GET_PROFILE_OUTLET_SUCCESS,
        payload: { followers, outletType: PROFILE_OUTLET.profileFollowers },
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
      dispatch({ type: GET_PROFILE_OUTLET_ERROR })
    }
  }

  const getProfileFollowing = async () => {
    dispatch({ type: GET_PROFILE_OUTLET_START })
    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/${state.profile.userName}/following`,
        { visitingUserId: state.user.userId }
      )
      const { following } = res.data
      console.log(res.data, 'get profile following')
      dispatch({
        type: GET_PROFILE_OUTLET_SUCCESS,
        payload: { following, outletType: PROFILE_OUTLET.profileFollowing },
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
      dispatch({ type: GET_PROFILE_OUTLET_ERROR })
    }
  }

  const logout = () => {
    remove_user_and_token_from_localstorage()
    dispatch({ type: LOGOUT_USER })
    toast.success('logout succesfull')
  }

  const remove_user_and_token_from_localstorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
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
        getProfileTweets,
        getProfileLikes,
        getProfileComments,
        getProfileFollowers,
        getProfileFollowing,
        logout,
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
