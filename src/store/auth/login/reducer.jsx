import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  AUTH_ME,
} from "./actionTypes"

const initialState = {
  error: "",
  user: {},
  loading: false,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      console.log('action.payload', action.payload)
      state = {
        ...state,
        user: {
          token: action.payload.token,
          userData: action.payload.data,
        },
        loading: false,
      }
      break
    case LOGOUT_USER:
      state = { ...state, user: {} }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state, user: {} }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    case AUTH_ME:
      state ={
        ...state,
        user: {
          ...state.user,
          userData: action.payload
        }
      }
    default:
      state = { ...state }
      break
  }
  return state
}

export default persistReducer(
  {
    storage,
    key: 'oppfilm-auth',
    whitelist: ['user'],
  },
  login
)
