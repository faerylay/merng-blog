import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Container, Box, Paper, Grid, TextField, Button } from '@mui/material';
import { useInput, REGISTER } from '../utils'
import { rememberLogin } from '../auth'



export default function Register() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const name = useInput()
  const email = useInput()
  const password = useInput()
  const confirmPassword = useInput()


  const [signUp, { loading }] = useMutation(REGISTER, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      registerInput: {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      }
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // TODO: err handling

    await signUp()
    console.log(errors)
    // TODO: this needs to be invalidated after 2h
    rememberLogin()

    navigate('/')
  }
  return (
    <Container maxWidth="lg" >
      <Box sx={{ paddingInline: 25 }}>
        <h1>Register</h1>
        <Paper>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justify='center'>
              <Grid item xs={12}>
                <TextField
                  {...name}
                  label='Name'
                  variant='outlined'
                  placeholder='John Smith'
                  margin='normal'
                  fullWidth
                  required
                />
                <TextField
                  {...email}
                  type='email'
                  label='Email'
                  variant='outlined'
                  placeholder='john.smith@example.com'
                  margin='normal'
                  fullWidth
                  required
                />
                <TextField
                  {...password}
                  type='password'
                  label='Password'
                  variant='outlined'
                  placeholder={'*'.repeat(12)}
                  margin='normal'
                  fullWidth
                  required
                />
                <TextField
                  {...confirmPassword}
                  type='password'
                  label='Confirm Password'
                  variant='outlined'
                  placeholder={'*'.repeat(12)}
                  margin='normal'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' disabled={loading}>
                  Register
                </Button>
              </Grid>
              <Grid item>
                <Link to='/login' variant='body2'>
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
