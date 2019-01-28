import {fetch} from "./fetch"

export const loginFun = (phone, password) => {
  return fetch({
    url: '/api/login',
    method: 'post',
    data:{
      phone : phone,
      password : password,
    },
  })
}

