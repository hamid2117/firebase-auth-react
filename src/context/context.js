import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
const AuthContext = React.createContext()
const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  const logOut = () => {
    return auth.signOut()
  }
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }
  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }
  const updateEmail = (email) => {
    return currentUser.updateEmail(email)
  }
  const updatePassword = (pass) => {
    return currentUser.updatePassword(pass)
  }
  useEffect(() => {
    const unSubcribed = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unSubcribed
  }, [])

  const value = {
    resetPassword,
    signUp,
    logOut,
    currentUser,
    signIn,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AuthContext)
}

export { ContextProvider, AuthContext }
