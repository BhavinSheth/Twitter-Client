import {
  GET_TRENDS_END,
  GET_TRENDS_ERROR,
  GET_TRENDS_START,
  GET_TRENDS_SUCCESS,
  SETUP_USER,
  SET_ACCESS_TOKEN,
  START_APP_SETUP,
  START_SPINNER,
  STOP_SPINNER,
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

    case SETUP_USER:
      return {
        ...state,
        accessToken: action.payload.accesstoken,
        user: { ...state.user, ...action.payload.user },
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
