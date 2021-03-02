import React, { useRef, useState } from 'react'
import { Alert, Form, Button, Card } from 'react-bootstrap'
import { useGlobalContext } from '../context/context'
import { Link, useHistory } from 'react-router-dom'
export default function Signup() {
  const history = useHistory()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPassRef = useRef()
  const { signUp } = useGlobalContext()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const handleSubmite = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== confirmPassRef.current.value) {
      return setError('Your password not matched')
    }
    try {
      setError('')
      setLoading(true)
      await signUp(emailRef.current.value, passwordRef.current.value)
      history.push('/login')
    } catch (error) {
      setError('Failed to create an account , Password should be 6 digit')
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleSubmite}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' ref={confirmPassRef} required />
            </Form.Group>
            <Button className='w-100' type='submit'>
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account ?<Link to='/login'> Log In </Link>
      </div>
    </>
  )
}
