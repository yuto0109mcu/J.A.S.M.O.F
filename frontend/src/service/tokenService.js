
const saveAuthToken = (token) => {
   localStorage.setItem("token", token)
}

const getAuthToken = () => {
   localStorage.getItem("token")
}

const verified = () => {
   return !!getAuthToken()
}

export { saveAuthToken, getAuthToken, verified }