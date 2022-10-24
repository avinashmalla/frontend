import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/appHooks'

import { Grid, Card, CardContent, Typography, CardMedia, Divider, CardActions, Chip, Avatar, IconButton, Stack, Button } from '@mui/material'
import { purple, red, yellow } from '@mui/material/colors'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import '../styles/pages/_Profile.scss'

const Profile = () => {
  const userReducer_state = useAppSelector(state => state.userReducer)
  const user = userReducer_state.currentUser

  return (
    <Grid container xs={12} className='grid--main-content'>
      {
        user
          ?
          <Card className='profile--card'>{/* sx={{ maxWidth: 300 }}*/}
            <CardContent >
              <CardMedia component="img" image={user.avatar} alt="User Image" className='profile--image' />
              <Stack direction="column" spacing={1}>
                <Typography variant="h5" align='left'>{user.name}</Typography>
                <Typography variant="h6" align='left'>{user.email}</Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Stack direction="row" spacing={10} justifyContent='space-between' alignItems='center'> {/* className = 'stack--buttons' */}
                <Chip avatar={<Avatar sx={{ bgcolor: red[100] }}><IconButton aria-label="Go Back"><ArrowBackIcon /></IconButton></Avatar>} label="Do something later?" variant="outlined" />
                <Chip avatar={<Avatar sx={{ bgcolor: yellow[100] }}><IconButton aria-label="Edit Button"><ModeEditIcon /></IconButton></Avatar>} label="Edit Profile" variant="outlined" />
              </Stack>
            </CardActions>
          </Card>
          : <Typography variant="h6" align='left'>This profile doesn't exist</Typography>
      }
    </Grid>
  )
}

export default Profile