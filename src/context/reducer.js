import {
  GET_TRENDS_ERROR,
  GET_TRENDS_START,
  GET_TRENDS_SUCCESS,
  START_SPINNER,
  STOP_SPINNER,
  USER_SETUP_START,
  USER_SETUP_SUCCESS,
  USER_SETUP_ERROR,
  GET_HOMEPAGE_TWEETS_START,
  GET_HOMEPAGE_TWEETS_SUCCESS,
  GET_HOMEPAGE_TWEETS_ERROR,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  LOGOUT_USER,
  GET_PROFILE_OUTLET_START,
  GET_PROFILE_OUTLET_SUCCESS,
  GET_PROFILE_OUTLET_ERROR,
  PROFILE_OUTLET,
} from './globalConstants'
import { initialState } from './appContext'

const reducer = (state, action) => {
  switch (action.type) {
    case 'increaseCount':
      return {
        ...state,
        count: state.count + 1,
      }

    case START_SPINNER:
      return {
        ...state,
        isLoading: true,
      }

    case STOP_SPINNER:
      return {
        ...state,
        isLoading: false,
      }

    case USER_SETUP_START:
      return {
        ...state,
        isLoading: true,
      }

    case USER_SETUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        configs: {
          headers: {
            Authorization: `Bearer ${action.payload.accessToken}`,
          },
        },
      }
    case USER_SETUP_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      }

    case GET_TRENDS_START:
      return {
        ...state,
        category: action.payload.category,
        isLoading: true,
      }

    case GET_TRENDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trends: action.payload.data,
      }
    case GET_TRENDS_ERROR:
      return {
        ...state,
        isLoading: false,
        trends: undefined,
      }

    case GET_HOMEPAGE_TWEETS_START:
      return {
        ...state,
        isLoading: true,
        isWaiting: true,
      }

    case GET_HOMEPAGE_TWEETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isWaiting: false,
        homePageTweets: action.payload.data,
      }
    case GET_HOMEPAGE_TWEETS_ERROR:
      return {
        ...state,
        isWaiting: false,
        isLoading: false,
      }

    case GET_USER_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      }

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload.data,
      }

    case GET_USER_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
      }

    case LOGOUT_USER:
      return {
        ...initialState,
        isLoggedIn: false,
        user: undefined,
        isLoading: false,
      }

    case GET_PROFILE_OUTLET_START:
      return {
        ...state,
        isLoading: true,
      }

    case GET_PROFILE_OUTLET_SUCCESS:
      const { outletType } = action.payload

      switch (outletType) {
        case PROFILE_OUTLET.profileTweets:
          return {
            ...state,
            isLoading: false,
            profileTweets: action.payload.tweets,
          }

        case PROFILE_OUTLET.profileLikes:
          return {
            ...state,
            isLoading: false,
            profileLikes: action.payload.liked,
          }

        case PROFILE_OUTLET.profileComments:
          return {
            ...state,
            isLoading: false,
            profileComments: action.payload.commented,
          }

        case PROFILE_OUTLET.profileFollowers:
          return {
            ...state,
            isLoading: false,
            profileFollowers: action.payload.followers,
          }

        case PROFILE_OUTLET.profileFollowing:
          return {
            ...state,
            isLoading: false,
            profileFollowing: action.payload.following,
          }

        default:
          return { ...state }
      }

    case GET_PROFILE_OUTLET_ERROR:
      return {
        ...state,
        isLoading: false,
      }

    default:
      return state
      throw new Error(`no such action : ${action.type}`)
  }
}

export default reducer
