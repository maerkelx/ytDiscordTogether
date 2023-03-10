//Encode String to Base64
export function encodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

//decode Base64 to String
export function decodeBase64(str) {
  return decodeURIComponent(escape(atob(str)));
}
