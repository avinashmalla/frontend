import { Avatar, Badge, Box, CardMedia, Chip, Drawer, Grid, IconButton, NativeSelect, Paper, styled, TextField, Typography, Icon } from '@mui/material'
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwipeRightAltRoundedIcon from '@mui/icons-material/SwipeRightAltRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red, green, orange, purple, yellow } from '@mui/material/colors';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import { addProductToCart, removeProductFromCart, removeUnitProductFromCart } from '../redux/reducers/cartReducer';
import { ProductInCart } from '../types/cart';
import { useAppDispatch, useAppSelector } from '../hooks/appHooks';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const CartDrawer = () => {
    const cartSelector = useAppSelector(state => state.cartReducer)
    const cart = cartSelector.myCart
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const dispatch = useAppDispatch()

    const getCartQuantity = () => {
        let qty = 0
        cart.map((product) => {
            qty += product.quantity
        })
        return qty
    }

    const getGrandTotal = () => {
        let grandTotal = 0
        cart.map((product) => {
            let productTotal = 0
            productTotal = product.price * product.quantity
            grandTotal += productTotal
        })
        return grandTotal
    }

    return (
        <>
            <IconButton aria-label="cart" onClick={() => setIsDrawerOpen(true)} >
                <StyledBadge badgeContent={getCartQuantity()} sx={{ color:yellow[500] }}>
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
            <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                {/* <Box p={2} width='35vw' textAlign='left' role='presentation'> */}
                <Grid container maxWidth='sm' paddingLeft='2vh' paddingTop='2vh'>
                    <Grid container direction='row' item xs={12} alignItems = 'flex-start' justifyContent="flex-start">
                        <Grid item xs={2}>
                            <IconButton aria-label="hide shopping cart" size="small" sx={{ color:yellow[500] , bgcolor: purple[100] }} onClick={() => setIsDrawerOpen(false)} >
                                <SwipeRightAltRoundedIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle2" component="div">
                                Grand Total {getGrandTotal()}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" component="div">
                                Number of Units {getCartQuantity()}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid sx={{ flexGrow: 1 }} container item spacing={2} paddingTop='4vh'>
                        {
                            cart.length > 0
                                ?
                                cart.map(product => (
                                    <Grid item xs={9} md={12} key={product.id}>
                                        <Paper sx={{ marginBottom: 2, paddingBottom: 1 }}>
                                            <Grid container spacing={2} direction='row'>
                                                <Grid item container xs={4} direction='column' alignItems='center' justifyContent='space-evenly' spacing={2}>
                                                    <Grid item>
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ width: '10vw' }}
                                                            image={product.images[0]}
                                                            alt={product.title}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Chip
                                                            avatar={
                                                                <Avatar sx={{ bgcolor: red[100] }}>
                                                                    <IconButton aria-label="remove this product from cart">
                                                                        <DeleteForeverIcon />
                                                                    </IconButton>
                                                                </Avatar>}
                                                            label="Remove"
                                                            variant="outlined"
                                                            onClick={() => { dispatch(removeProductFromCart(product)) }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={8} container direction='column' rowSpacing={2} alignItems='left' justifyContent='space-between'>
                                                    <Grid item>
                                                        <Typography variant='subtitle2'>
                                                            {product.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container maxWidth={'15vw'} direction='row' alignItems='center' justifyContent='center' rowSpacing={1}>
                                                        <Grid item xs={12} paddingLeft='0.8em' marginBottom='-1em' >
                                                            <Typography variant='subtitle2' align='left' paddingLeft='1em'>
                                                                Quantity
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item container direction='row' alignItems='center' justifyContent='flex-start' spacing={1}>
                                                            <Grid item >
                                                                <IconButton aria-label="remove one product from cart" color='error' onClick={() => {
                                                                    dispatch(removeUnitProductFromCart({ ...product, quantity: 1 }))
                                                                }}><RemoveCircleRoundedIcon /></IconButton>
                                                            </Grid>
                                                            <Grid item >
                                                                <Typography variant='h6'>
                                                                    {product.quantity}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item >
                                                                <IconButton aria-label="add one product to cart" color='success' onClick={() => {
                                                                    dispatch(addProductToCart({ ...product, quantity: 1 }))
                                                                }}><AddCircleRoundedIcon /></IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant='button' display="block">
                                                            {product.price * product.quantity} €
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                ))
                                :
                                <Typography> your cart is empty</Typography>
                        }
                    </Grid>
                </Grid>
                {/* </Box> */}
            </Drawer>
        </>
    )
}

export default CartDrawer