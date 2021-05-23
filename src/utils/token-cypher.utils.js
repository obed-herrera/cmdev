import JWTDecode from "jwt-decode";

export function decodeToken(toDecode){
    return JWTDecode(token);
} 

export function encodeToken(toEncode){
    return JWTEncode(token);
}