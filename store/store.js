import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import axios from 'axios'

export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_LOADING        = 'SET_LOADING'
export const FOCUS_REPO = 'FOCUS_REPO'
export const LOGOUT = 'LOGOUT'

