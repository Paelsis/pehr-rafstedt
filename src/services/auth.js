import firebase from "gatsby-plugin-firebase"

export const isBrowser = () => typeof window !== "undefined"

const accessList = [
    {
        displayName:"Per Eskilson",
        email:"paelsis@hotmail.com"
    },
    {
        displayName:"Pehr Rafstedt",
        email:"pr@raftstedt.se"
    },
]


export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}


const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

// Used for firebase  
export const getData = () =>
  isBrowser() && window.localStorage.getItem("gatsbyData")
    ? JSON.parse(window.localStorage.getItem("gatsbyData"))
    : {}

const setData = data =>
  window.localStorage.setItem("gatsbyData", JSON.stringify(data))

export const handleLogin = ({ username, email }) => {
  accessList.forEach(it => { 
    if (it.email === email) {
        return setUser(it)
    }    
  })
  return false
}

export const handleLoginFirebase = ({user}) => {
  return setUser(user)
}

export const isLoggedIn = () => {
  const user = getUser()
  console.log('isLoggedIn, user', user)
  return !!user.email
}

export const logout = callback => {
  setUser({})
  callback()
}


