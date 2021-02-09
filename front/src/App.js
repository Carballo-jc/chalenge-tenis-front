import React, {createContext, useState, useEffect} from 'react'
import './App.css';
import SlamTabs from './slams/SlamTabs'
import RootStore from './store'
import Background from './assets/bg-2.png'
import Logo from './assets/logo.png'
import { makeStyles, withStyles, ThemeProvider, createMuiTheme  } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
export const StoreContext = createContext();

const useStyles = makeStyles((theme) => ({

  '@global': {
    'body': {
      padding: 0,
      margin:0
    },
  },
  banner:{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& img':{
      width: 250
    },
    '& h6':{
      width: '60%',
      textAlign: 'center',
      margin: '10px 0 30px',
      color: '#284164'
    },


  },
  containerSlams:{
    width: '50%',
    margin: 'AUTO',


    [theme.breakpoints.down('sm')]: {
      width: '100%',

    }

  },
  bannerBg: {
    height: '100vh',
    backgroundImage: "url(" + Background + ")",
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  }



}))

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#40a1f2',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#fcce02',
      dark: '#ba000d',
      contrastText: '#000',
    }

  },
});

const App = ()=> {
  const classes = useStyles()
  const [store, setStore] = useState()

  useEffect(()=>{
    const rootStore = new RootStore()
    setStore(rootStore)

  },[])

  return (
    <ThemeProvider theme={theme}>
      <StoreContext.Provider value={store}>
        <div className={classes.bannerBg}>
          <div className={classes.banner}>
            <img src={Logo} alt="logo"/>
            <Typography variant='h6'>
              El Grand Slam de tenis está constituido por los cuatro torneos mayores del circuito internacional organizados por la Federación Internacional de Tenis
            </Typography>
          </div>
          <div className={classes.containerSlams}>
            {store && <SlamTabs/>}
          </div>
        </div>
      </StoreContext.Provider>
    </ThemeProvider>
  );
}
export default withStyles(useStyles)(App)
