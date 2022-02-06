import React from 'react';
import { Box, Typography, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Collapse } from '@mui/material';
import { Favorite, Share, MoreVert, Expand } from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils'
import { Comments } from './'
import { styled } from '@mui/material/styles';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function Posts() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { loading, error, data: { posts } = {} } = useQuery(FETCH_POSTS_QUERY);

  if (error) return `Error! ${error.message}`;
  return (
    <div>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : (
        <Box>
          {
            posts.map(post => (
              <Box key={post.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader avatar={
                    <Avatar aria-label="recipe">
                      R
                    </Avatar>
                  }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVert />
                      </IconButton>
                    }
                    title={post.author.name}
                    subheader={post.createdAt}
                  />
                  <CardMedia
                    component="img"
                    height="100%"
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png"
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="h6" color="black">{post.title}</Typography>
                    <Typography variant="body2" color="text.secondary"> {post.description}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <Favorite /> .    {post.likeCount}
                    </IconButton>
                    <IconButton aria-label="share">
                      <Share /> .{post.commentCount}
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <Expand />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Comments post={post} />
                    </CardContent>
                  </Collapse>
                </Card>

              </Box>
            ))
          }

        </Box>
      )
      }
    </div>
  );
}
