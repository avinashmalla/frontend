import { Grid, Typography, CardMedia, Container, Link as MUILink, Box } from '@mui/material'
import { blue, yellow } from '@mui/material/colors'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../components/Login'
import { useAppDispatch, useAppSelector } from '../hooks/appHooks'
import { fetchCategories, fetchProductsByCategory } from '../redux/reducers/categoryReducer'


const Homepage = () => {
  const products = useAppSelector(state => state.productReducer.productList)
  const categories = useAppSelector(state => state.categoryReducer.categories)
  const productList = useAppSelector(state => state.categoryReducer.productList)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [products])

  const handleCategoryClick = async (catId: number | undefined) => {
    await dispatch(fetchProductsByCategory(catId))
    navigate(`../${catId}`)
}

  return (
    <Container>
      <Grid container direction='column' justifyContent='center' alignItems='center' rowSpacing={1}>
        <Grid item xs={12} justifyContent='center' alignItems='center'>
          <MUILink href="/products">
            <CardMedia
              component="img"
              sx={{ width: '80vw' }}
              image={require('../media/mainBanner.png')}
              alt="banner-image"
            />
          </MUILink>
        </Grid>
        <Grid item container xs justifyContent='center' spacing={1} width = '90vw'>
          {
            categories && categories.map((category) => (            
              <Grid item justifyContent='center' alignItems='center'>
                <MUILink href={`/categories/${category.id}`}>
                  <Box 
                    sx={{
                      width: '15vw',
                      height: '15vw',
                      color: blue[800],
                      backgroundColor: 'secondary.main',
                      '&:hover': {
                        color: yellow['A200'],
                        backgroundColor: 'secondary.dark',
                      },
                      backgroundImage: `url(${category.image})`
                    }}
                    onClick = {async() => {
                      await dispatch(fetchProductsByCategory(category.id))
                      navigate(`../categories/${category.id}`)
                    }}
                    >
                    <Typography variant = 'button' alignSelf='center'>
                        {category.name}
                    </Typography>
                  </Box>
                </MUILink>
              </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Homepage