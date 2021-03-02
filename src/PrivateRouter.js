import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useGlobalContext } from './context/context'
const PrivateRouter = ({ component: Component, ...rest }) => {
  const { currentUser } = useGlobalContext()

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to='/login' />
      }}
    />
  )
}

export default PrivateRouter
