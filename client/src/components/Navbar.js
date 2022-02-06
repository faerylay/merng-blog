import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Container, AppBar, Box, Toolbar, IconButton, Typography, Avatar, Button } from '@mui/material';
import { gql, useMutation } from '@apollo/client'
import SearchBox from './Search'
import { isLoggedIn, forgetLogin } from '../auth'

const LOG_OUT = gql`
  mutation {
    signOut
  }
`
const Navbar = () => {
  const navigate = useNavigate()
  const [logOut, { loading }] = useMutation(LOG_OUT)
  const handleLogout = async () => {
    await logOut()
    forgetLogin()
    navigate('/login')
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Container maxWidth="lg" >
          <Toolbar>
            <Button color="inherit" onClick={() => navigate('/')} >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }, textTransform: 'none' }}
              >
                Dev
              </Typography>
            </Button>
            <SearchBox />
            <Box sx={{ flexGrow: 1 }} />
            {
              isLoggedIn() ? (
                <Box sx={{ flexGrow: 0, display: 'flex' }}>
                  <Button color="inherit" onClick={handleLogout} sx={{ fontSize: { xs: 11, md: 14 } }}>
                    <Typography
                      variant="p"
                      noWrap
                      component="div"
                      sx={{ textTransform: 'none' }}
                    >
                      {loading ? 'loading...' : 'Logout'}
                    </Typography>
                  </Button>
                  <IconButton onClick={() => { }} >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ flexGrow: 0, display: 'flex' }}>
                  <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontSize: { xs: 12, md: 14 } }} >
                    <Typography
                      variant="p"
                      noWrap
                      component="div"
                      sx={{ textTransform: 'none' }}
                    >
                      Login
                    </Typography>
                  </Button>
                  <Button variant="outlined" color="inherit" onClick={() => navigate('/register')} sx={{ fontSize: { xs: 12, md: 14 } }}>
                    <Typography
                      variant="p"
                      noWrap
                      component="div"
                      sx={{ textTransform: 'none' }}
                    >
                      Create account
                    </Typography>
                  </Button>
                </Box>
              )
            }
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default Navbar
