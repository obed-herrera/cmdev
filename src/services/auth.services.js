// auth.service.js
import { encodeToken, decodeToken, TOKEN } from "../utils";

/**
 * @author CosmicTiger - Luisangel Marcia
 * @description It helps to set the Token of authentication in localStorage of the user
 * @param {String} token - The token that comes in the login of the user
 */
function setAuth(token) {
    let secureToken = encodeToken(token)
    localStorage.setItem(TOKEN, secureToken)
}

/**
 * @author CosmicTiger - Luisangel Marcia
 * @description Will always check on the fact that the user is authenticated to ask for certains request to the server
 * @returns {Object<string>} x-auth-token - The token header for authentication requests from client to server
 */
function getAuth() {
    if (!isAuth()) return {}

    let secureToken = localStorage.getItem(TOKEN)
    let token = decodeToken(secureToken)

    return {
        'x-auth-token': token,
    }
}

/**
 * @author CosmicTiger - Luisangel Marcia
 * @description It helps to get the string value of the token for each user authenticated
 * @returns {String} token - The token string that was store in localStorage
 */
function getAuthToken() {
    if (!isAuth()) return null

    let secureToken = localStorage.getItem(TOKEN)
    let token = decodeToken(secureToken)

    return token
}

/**
 * @author CosmicTiger - Luisangel Marcia
 * @summary Would validate if the token exists in localStorage or no
 * @returns {Boolean} true or false
 */
function isAuth() {
    return localStorage.getItem(TOKEN) !== null
}

/**
 * @author CosmicTiger - Luisangel Marcia
 * @summary This function would get rid user token for closing the session
 * @returns {Object} Empty
 */
function removeAuth() {
    localStorage.removeItem(TOKEN)
}

export {
    setAuth,
    getAuth,
    getAuthToken,
    removeAuth,
    isAuth
}
