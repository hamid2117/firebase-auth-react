import React, { useRef, useState } from 'react'
import { Alert, Form, Button, Card } from 'react-bootstrap'
import { useGlobalContext } from '../context/context'
import { Link, useHistory } from 'react-router-dom'
export default function Login() {
  const history = useHistory()
  const emailRef = useRef()
  const passwordRef = useRef()

  const { signIn } = useGlobalContext()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const handleSubmite = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await signIn(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch (error) {
      setError('check your email or password')
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center'>Log in</h2>
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
            <Button className='w-100' type='submit'>
              Log in
            </Button>
            <div className='w-100 text-center mt-3'>
              <Link to='/forget-password'> Forget Password </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        You have not an account ? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  )
}
