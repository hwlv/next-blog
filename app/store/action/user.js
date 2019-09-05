import axios from 'axios';
import * as constants from '../constants/user';

const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true
})

export const logout = () => ({
  type: constants.LOGOUT,
  value: false
})

export const increment = () => ({
  type: constants.ADD,
  value: 1
})

export const decrement = () => ({
  type: constants.DEC,
  value: 1
})

export const login = (accout, password) => {
  return (dispatch) => {
    axios.get('/api/login.json?account=' + accout + '&password=' + password).then((res) => {
      const result = res.data.data;
      if (result) {
        dispatch(changeLogin())
      } else {
        alert('登陆失败')
      }
    })
  }
}
