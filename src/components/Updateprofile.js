import React, { useRef, useState } from 'react'
import { Alert, Form, Button, Card } from 'react-bootstrap'
import { useGlobalContext } from '../context/context'
import { Link, useHistory } from 'react-router-dom'
export default function Updateprofile() {
  const history = useHistory()
  const emailRef = useRef()
  const passwordRef = useRef()

  const { currentUser, updateEmail, updatePassword } = useGlobalContext()
  const [error, setError] = useState()

  const [loading, setLoading] = useState(false)
  const handleSubmite = (e) => {
    e.preventDefault()
    const promises = []
    setLoading(true)
    setError('')
    if (emailRef.current.value !== currentUser.email) {
      return promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      return promises.push(updatePassword(passwordRef.current.value))
    }
    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch((error) => {
        console.log(error)
        setError('failed to update account ')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center'>Update profile </h2>
          {error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleSubmite}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder=' fill blank if not wanna pass update'
                ref={passwordRef}
              />
            </Form.Group>
            <Button className='w-100' type='submit'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don;t wanna update the email or password
        <Link to='/'> Back to home </Link>
      </div>
    </>
  )
}
