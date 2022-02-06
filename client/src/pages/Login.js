import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Container, TextField, Button, Paper, Box, Grid, Avatar, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';

import { rememberLogin } from '../auth'
import { useInput, LOG_IN } from '../utils';


export default function Login() {
  const [errors, setErrors] = useState('')
  const navigate = useNavigate();
  const email = useInput()
  const password = useInput()
  const [logIn, { loading }] = useMutation(LOG_IN, {
    update() {
      rememberLogin()
      navigate('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
    variables: {
      email: email.value,
      password: password.value
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    await logIn()
  }
  return (
    <Container maxWidth="lg">
      <Box sx={{ paddingInline: 25 }}>
        <h1>Login</h1>
        <Paper>
          <Typography
            variant="body2"
            noWrap
            component="div"
            sx={{ textTransform: 'none' }}
          >
            {errors}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                <Avatar>
                  <Person />
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...email}
                  error={errors ? true : false}
                  type='email'
                  label='Email'
                  variant='outlined'
                  placeholder='john.smith@example.com'
                  fullWidth
                  required
                />
                <TextField
                  {...password}
                  error={errors ? true : false}
                  type='password'
                  label='Password'
                  variant='outlined'
                  placeholder={'*'.repeat(12)}
                  margin='normal'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' color='primary' size='large' disabled={loading}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify='space-between'>
                  <Grid item>
                    <Link to='/reset'>Forgot password?</Link>
                  </Grid>
                  <Grid item>
                    <Link to='/register' variant='body2'>
                      {"Don't have an account?"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

    </Container>
  );
}
