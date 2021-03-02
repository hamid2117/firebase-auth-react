import React, { useState } from 'react'
import { Alert, Card } from 'react-bootstrap'
import { useGlobalContext } from '../context/context'
import { Link, useHistory } from 'react-router-dom'

const Dashboard = () => {
  const history = useHistory()
  const { currentUser, logOut } = useGlobalContext()
  const [error, setError] = useState()
  const logout = async () => {
    setError('')
    try {
      await logOut()
      history.push('/login')
    } catch (error) {
      setError('log out failed ')
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {<p>{currentUser.email}</p>}

          <Link className='btn btn-primary w-100 mt-3 ' to='/update-profile'>
            update Profile{' '}
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <button onClick={logout}>Log out</button>
      </div>
    </>
  )
}

export default Dashboard
