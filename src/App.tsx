import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.scss';
// import './styles/App.scss'

import { useAppDispatch } from './hooks/appHooks';
import { fetchProducts } from './redux/reducers/productReducer'
import NavBar from './components/NavBar'
import Homepage from './pages/Homepage'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'
import Profile from './pages/Profile'
import Categories from './pages/Categories';
import { amber, grey } from '@mui/material/colors';
import ThemeContext from './theme/ThemeContext';

function App() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProducts({ offset: 0, limit: 30 }))
  }, [])

  const themecontext = {
    changeTheme: () => {
      setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light')
    }
  }

  const theme = createTheme({
    palette: {
      mode,
      ...mode === "light"
        ? {
          nav: { primary: grey[900], secondary: amber[100] },
          secondary: { main: amber[100] },
          text: { primary: grey[900], secondary: amber[100] },
          bg: { default: grey[100] },
          card: { txtPrimary: grey[900] },
          btn: { bg: grey[900], text: amber[100] }
        }
        : {
          
        }
    }
  });


  return (
    <ThemeContext.Provider value={themecontext}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='' element={<Homepage />} />
              <Route path='products' >
                <Route path='' element={<Products />} />
                <Route path=':productId' element={<SingleProduct />} />
              </Route>
              <Route path='categories'>
                <Route path='' element={<Categories />} />
                <Route path=':currentCategory' element={<Categories />} />
              </Route>
              <Route path='profile' element={<Profile />} />

            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
