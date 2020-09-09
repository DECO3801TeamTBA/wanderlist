import {
    SET_USER_AUTH_TOKEN, SET_USER, SET_TOKEN_EXPIRY
} from './types'

export const setUser = (user) => ({
    type: SET_USER,
    data: user
});

export const setToken = (token) => ({
    type: SET_USER_AUTH_TOKEN,
    data: token
});

export const setTokenExpiry = (expiry) => ({
    type: SET_TOKEN_EXPIRY,
    data: expiry
});