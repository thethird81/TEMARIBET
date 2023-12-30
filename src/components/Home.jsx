import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { IconButton,Box, Stack, Button, Typography } from '@mui/material';
import { Settings, Info, ContentCopy, Favorite } from '@mui/icons-material';






const Home = () => {
  return (

      <Stack  display="flex" spacing={8} justifyContent="center" alignItems="center" margin={16}>
        <Box  margin={2}>
        <Button
            variant="contained"
            style={{ backgroundColor: 'blue' }}
            component={Link}
            to="/QuizeList"
        >
            <Typography variant='h1'> Class Room</Typography>

        </Button>
        </Box>
        <Box>
        <Button
            variant="contained"
            style={{ backgroundColor: 'red'}}
            component={Link}
            to="/Feed"

        >
            <Typography variant='h1'>Vedios</Typography>
        </Button>
        </Box>
      </Stack>


  );
};

export default Home;
