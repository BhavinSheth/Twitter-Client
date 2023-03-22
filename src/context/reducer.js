import {
  GET_TRENDS_ERROR,
  GET_TRENDS_START,
  GET_TRENDS_SUCCESS,
  START_SPINNER,
  STOP_SPINNER,
  USER_SETUP_START,
  USER_SETUP_SUCCESS,
  USER_SETUP_ERROR,
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

    default:
      return state
      throw new Error(`no such action : ${action.type}`)
  }
}

export default reducer
