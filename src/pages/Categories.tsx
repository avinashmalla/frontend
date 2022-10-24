import React, { useEffect, useState } from 'react'
import { Box, Grid, IconButton, Card, CardContent, Typography, CardMedia, Divider, CardActions, Chip, Avatar } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { purple } from '@mui/material/colors'
import { useAppDispatch, useAppSelector } from '../hooks/appHooks'
import { fetchCategories, fetchProductsByCategory } from '../redux/reducers/categoryReducer'
import Products from './Products'
import { useNavigate, useParams } from 'react-router-dom'
import { addProductToCart } from '../redux/reducers/cartReducer'
import { Product } from '../types/products'

const Categories = () => {
    const products = useAppSelector(state => state.productReducer.productList)
    const categories = useAppSelector(state => state.categoryReducer.categories)
    const categoryProductList = useAppSelector(state => state.categoryReducer.productList)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {currentCategory} = useParams()

    const handleAddToCart = (product: Product, quantity: number = 1) => {
        dispatch(addProductToCart({ ...product, quantity }))
      }

    useEffect(() => {
        dispatch(fetchProductsByCategory(currentCategory))
        dispatch(fetchCategories())
    }, [products])


    const handleCategoryClick = async (catId: number | undefined) => {
        await dispatch(fetchProductsByCategory(catId))
        navigate(`../${catId}`)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} paddingTop='1em'> {/* paddingLeft={{xs: '2em', sm: '3em', md: '5', lg: '15em'  }} paddingRight={{xs: '2em', sm: '3em', md: '5', lg: '15em'  }} */}
                <Grid item container xs={12} justifyContent="center" rowSpacing={2}>
                    <Grid item xs = {12}>
                        {
                            categories && categories.map((category) => (
                                <Chip
                                    avatar={<Avatar alt={category.name} src={category.image} />}
                                    label={category.name}
                                    variant="outlined"
                                    clickable
                                    onClick = {() => {handleCategoryClick(category.id)}}
                                />
                            ))
                        }
                    </Grid>
                    <Grid item>
                        {
                            (currentCategory === undefined) 
                            ?<Products />
                            :<Grid item container xs direction='row' rowSpacing={2} columnSpacing={3} justifyContent='center'>
                                {categoryProductList && categoryProductList.map(product => (
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
                                        onClick={() => navigate(`../../products/${product.id}`)} 
                                        />
                                        <Divider textAlign="left">.</Divider>
                                        <Typography variant="subtitle2" align='left'>{product.title}</Typography>
                                        <Typography variant="h6" align='left'>{product.price}€ </Typography>
                                        <Divider textAlign="left">.</Divider>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                                        <Grid item xs={12}>
                                            <Chip avatar={<Avatar sx={{ bgcolor: purple[100] }}>
                                                <IconButton aria-label="Add product to cart">
                                                    <AddShoppingCartIcon />
                                                </IconButton>
                                                </Avatar>} label="Add to Cart" variant="outlined" onClick={() => handleAddToCart(product)} />
                                        </Grid>
                                        </Grid>
                                    </CardActions>
                                    </Card>
                                </Grid>
                                ))}
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Categories