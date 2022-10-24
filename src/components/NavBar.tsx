import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import '../styles/components/_NavBar.scss'
import CartDrawer from "./CartDrawer";

import { AppBar, Badge, Box, Divider, Drawer, IconButton, Stack, Toolbar, Typography, useTheme } from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Login from "./Login";
import ThemeContext from "../theme/ThemeContext";


const NavBar = () => {
    const theme = useTheme()
    const colorMode = useContext(ThemeContext)

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <ShoppingCartOutlinedIcon />
                </IconButton>
                <Typography variant='h6' component='div' paddingRight='2em'>
                    My Shop
                </Typography>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Login />
                {/* <Divider orientation="vertical" flexItem /> */}
                <Stack direction='row' spacing={1} justifyContent='flex-end' alignItems='center' divider={<Divider orientation="vertical" flexItem />} sx={{ flexGrow: 1 }}>
                    <IconButton onClick={() => colorMode.changeTheme()} >
                        {theme.palette.mode === 'dark' ? (<LightModeOutlinedIcon />) : (<DarkModeOutlinedIcon />)}
                    </IconButton>
                    <Link to='/'> Home </Link>
                    <Link to='/products'>Products</Link>
                    <Link to='/categories'>Categories</Link>
                    {/* <Login /> */}
                    <CartDrawer />
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar