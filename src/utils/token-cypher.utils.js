import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = 'of09jflsdkcmeijfdkslaksjfdsa'

function decodeToken(toDecode) {
    return CryptoJS.AES.decrypt(toDecode, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
}

function encodeToken(toEncode) {
    return CryptoJS.AES.encrypt(toEncode, ENCRYPTION_KEY).toString()
}

export {
    encodeToken,
    decodeToken
}