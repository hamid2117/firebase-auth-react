import React, { useRef, useState } from 'react'

import { Alert, Form, Button, Card } from 'react-bootstrap'
import { useGlobalContext } from '../context/context'
import { Link } from 'react-router-dom'
export default function Login() {
  const emailRef = useRef()

  const { resetPassword } = useGlobalContext()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [massege, setMassege] = useState()
  const handleSubmite = async (e) => {
    e.preventDefault()
    try {
      setMassege('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMassege('check your email inbox')
    } catch (error) {
      setError('Failed to reset password')
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center'>Reset Password </h2>

          {error && <Alert variant='danger'>{error}</Alert>}
          {massege && <Alert variant='sucess'>{massege}</Alert>}
          <Form onSubmit={handleSubmite}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Button className='w-100' type='submit'>
              Reset password
            </Button>
            <div className='w-100 text-center mt-3'>
              <Link to='/login'> Login </Link>
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
