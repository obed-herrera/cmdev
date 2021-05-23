import {encodeToken, decodeToken} from "../utils";

export function setAuth(token){
    localStorage.setItem(TOKEN, token);
} 
export function getAuth(){
    if(!isAuth()) return {}
    let secureToken = localStorage.getItem(TOKEN);
    let token = decodeToken(secureToken);
    return {
        "x-auth-token": token
    }
}
export function getAuthToken(){
    if(!isAuth()) return {}
    let secureToken = localStorage.getItem(TOKEN);
    let token = decodeToken(secureToken);
    return token
}
export function isAuth(){
    return localStorage.getItem(token) !== null;
}
export function removeAuth(){
    localStorage.removeItem(token);
}