
const saveAuthToken = (token, id) => {
   sessionStorage.setItem("token", token)
   sessionStorage.setItem("id", id)
}

const getAuthToken = () => {
   sessionStorage.getItem("token")
   sessionStorage.getItem("id")
}

const verified = () => {
   return !!getAuthToken()
}

export { saveAuthToken, getAuthToken, verified }