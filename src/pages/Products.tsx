import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CssBaseline, Divider, Grid, IconButton, Stack, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Alert, Collapse, Box } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch, useAppSelector } from '../hooks/appHooks'
import purple from '@mui/material/colors/purple';

import { useNavigate } from 'react-router-dom';

import '../styles/pages/_Products.scss'
import { deleteProductASync, fetchProducts } from '../redux/reducers/productReducer';
import { useState } from 'react';
import { Product } from '../types/products';
import React from 'react';
import { addProductToCart } from '../redux/reducers/cartReducer';



const Products = () => {
  const products = useAppSelector(state => state.productReducer.productList)
  const loggedInUser = useAppSelector(state => state.userReducer.currentUser)
  const [pageNum, setPageNum] = useState(0)
  const [perPage, setPerPage] = useState(12)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    dispatch(addProductToCart({ ...product, quantity }))
  }

  const onChangePage = (input: 'left' | 'right') => {
    if (pageNum > 0 && input === 'left') {
      setPageNum(pageNum - 1)
    } else {
      setPageNum(pageNum + 1)
    }
    dispatch(fetchProducts({
      offset: pageNum,
      limit: 12
    }))
  }



  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}> {/* paddingLeft={{xs: '2em', sm: '3em', md: '5', lg: '15em'  }} paddingRight={{xs: '2em', sm: '3em', md: '5', lg: '15em'  }} */}
          <Grid item xs={12} justifyContent="space-between" >
            <IconButton aria-label="Pagination Left" onClick={() => onChangePage('left')}><KeyboardArrowLeftIcon /></IconButton>
            <IconButton aria-label="Pagination Right" onClick={() => onChangePage('right')}><KeyboardArrowRightIcon /></IconButton>
          </Grid>
          <Grid item container xs direction='row' rowSpacing={2} columnSpacing={3} justifyContent='center'>
            {products && products.map(product => (
              <Grid item key={product.id}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" align='left'>ID: {product.id}</Typography>
                    <CardMedia 
                      component="img" 
                      className='products--main-image' 
                      image={product.images[0]} 
                      alt="Product Image" 
                      sx = {{ width : '15em', height : '15em' }}
                      onClick={() => navigate(`${product.id}`)} 
                    />
                    <Divider textAlign="left">.</Divider>
                    <Typography variant="subtitle2" align='left'>{product.title}</Typography>
                    <Typography variant="h6" align='left'>{product.price}€ </Typography>
                    <Divider textAlign="left">.</Divider>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                      <Grid item xs={12}>
                        <Chip avatar={<Avatar sx={{ bgcolor: purple[100] }}><IconButton aria-label="Add product to cart"><AddShoppingCartIcon /></IconButton></Avatar>} label="Add to Cart" variant="outlined" onClick={() => handleAddToCart(product)} />
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Products
