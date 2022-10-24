import { Avatar, Box, Button, Container, CssBaseline, Stack, TextField, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';
import { loginAsync, loginByToken, logOut } from '../redux/reducers/userReducer';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loggedInUser = useAppSelector(state => state.userReducer).currentUser
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClickOnProfile = (event: any | undefined) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const boxStyle = {
    '& .MuiTextField-root': { m: 1, width: '25ch' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 400,
    paddingTop: '2em',
    positon: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(100%, 50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24
  }

  useEffect(() => {
    const token = localStorage.getItem(`sessUser`)
    if (token) {
      const loggedInUser = dispatch(loginByToken(token))
    }
  }, []);

  function handleLoginSubmit() {
    handleMenuClose()
    dispatch(loginAsync({ email, password }))
    // handleMenuClose()
  }

  const handleLogout = () => {
    setEmail("")
    setPassword("")
    localStorage.removeItem(`sessUser`)
    dispatch(logOut(loggedInUser))
    handleMenuClose()
  };

  if (loggedInUser) {
    return (
      <>
        <CssBaseline />
        <IconButton size='medium' edge='start' color='inherit' aria-label='Profile' onClick={(e) => handleClickOnProfile(e)}>
          <Avatar alt={loggedInUser.name} src={loggedInUser.avatar} />
        </IconButton>
        <Typography variant="body2">
          {loggedInUser.email}
        </Typography>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <MenuItem onClick={() => navigate("../profile", { replace: true })}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <>
      <CssBaseline />
      <IconButton size='medium' edge='start' color='inherit' aria-label='Profile' onClick={(e) => handleClickOnProfile(e)}>
        <PersonPinRoundedIcon />
        <Typography>
          Login
        </Typography>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleModalOpen}>Login</MenuItem>
      </Menu>
      <Container maxWidth='sm'>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={boxStyle}>
            <TextField id="outlined-secondary" label="Email" variant="outlined" onChange={e => setEmail(e.target.value)} />
            <TextField id="outlined-password-input" label="Password" type="password" variant="outlined" onChange={e => setPassword(e.target.value)} />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleLoginSubmit}>Submit</Button>
              {/* <Button variant="outlined" color="error" onClick={() => localStorage.clear()}>Clear Local Storage</Button> */}
            </Stack>
          </Box>
        </Modal>
      </Container>
    </>
  )
}

export default Login