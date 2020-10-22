import {
    SET_USER_AUTH_TOKEN, SET_USER, SET_TOKEN_EXPIRY, SET_USER_IS_AUTH
} from './types'

export const setUser = (user) => ({
    type: SET_USER,
    data: user
});

export const setToken = (authToken) => ({
    type: SET_USER_AUTH_TOKEN,
    data: authToken
});

export const setExpiry = (expiry) => ({
    type: SET_TOKEN_EXPIRY,
    data: expiry
});

export const setIsAuth = (isAuth) => ({
    type: SET_USER_IS_AUTH,
    data: isAuth
})