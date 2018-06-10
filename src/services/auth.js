const AUTH_TOKEN_KEYNAME = 'authToken'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEYNAME) || ''

export const setAuthToken = (token) => localStorage.setItem(AUTH_TOKEN_KEYNAME, token)

export const logout = () => localStorage.setItem(AUTH_TOKEN_KEYNAME, '')