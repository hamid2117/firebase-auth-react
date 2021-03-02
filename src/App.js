import React from 'react'
import Signup from './components/signup'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRouter from './PrivateRouter'
import Forget from './components/Forget'
import Updateprofile from './components/Updateprofile'

import Dashboard from './components/Dashboard'
import Login from './components/login'

function App() {
  return (
    <Container
      className='d-flex align-items-center justify-content-center '
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <Switch>
            <PrivateRouter path='/' exact component={Dashboard} />

            <Route path='/signup'>
              <Signup></Signup>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path='/forget-password'>
              <Forget />
            </Route>
            <Route path='/update-profile'>
              <Updateprofile />
            </Route>
          </Switch>
        </Router>
      </div>
    </Container>
  )
}

export default App
