import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { ME } from '../utils'
import { Posts } from '../components'
const Home = () => {
  const { loading, error, data: { me } = {} } = useQuery(ME, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <Container maxWidth="lg" >
      <div style={{ paddingInline: 25 }}>
        <h1>Home</h1>
      </div>

      <Typography variant='h6' color='royalblue' sx={{ marginBottom: 5 }}>UserName - {me?.name}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Posts />
        </Grid>
      </Grid>
    </Container>
  );
}



export default Home