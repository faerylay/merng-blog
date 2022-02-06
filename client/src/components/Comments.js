import React from 'react';
import { Box, Typography } from '@mui/material';
export default function Comments({ post }) {

  return <div>
    {
      post.comments.map(comment => (
        <Box key={comment.id} sx={{ paddingBottom: 1 }}>
          <Typography variant="body2" sx={{ marginRight: 5 }}>{comment.author.name}</Typography>
          <Typography variant="body2" color="silver" sx={{ padding: 1 }}>{comment.text}</Typography>
        </Box>
      ))
    }
  </div>;
}
