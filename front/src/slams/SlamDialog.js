import React, { useContext, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close'
import DialogTitle from '@material-ui/core/DialogTitle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { observer, useObserver } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../App'
import Loading from '../assets/tloading.gif'
import Trophy from '../assets/trophy.png'
import Headband from '../assets/headband.svg'


const useStyles = makeStyles((theme) => ({

  loadingContainer:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    top:0,
    zIndex: 10,
    backgroundColor: '#fff',
    '& img':{
      width: '100%',
      marginTop: '35%'
    }
  },
  dialogContent:{
    height: 500,
    width: 300,
    padding:0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContent:{
    width: 100,

  },
  headband:{
    fill:'red',
    width: 200
  },
  headbandGround:{
    position: 'relative',
    display: 'block',
    width: '100%',
    height: 50,
    '& img':{
      position: 'absolute',
      left: '5%',
      top: '-44px',
      width: '90%',
      zIndex: 0,
    },
    '& h6':{
      position: 'relative',
      textAlign:'center',
      color: '#fff',
      zIndex: 3,
      marginTop: 4
    },
    date:{
      display: 'flex',
      alignItems: 'center',
    },

    dialogTitle:{
      backgroundColor: '#40a1f2',
      color: 'wheat',
    }
  }



}))

const SlamDialog = observer(({open, handleClose})=>{

  const [dataPlayer, setDataPlayer] = React.useState({});
  const [loadingWinner, setLoadingWinner] = React.useState(false);
  const rootStore = useContext(StoreContext)
  const classes = useStyles()

  useEffect(()=>{
    setTimeout(()=>{
      setLoadingWinner(false)
    }, 3000)
  }, [dataPlayer])


  useEffect(()=>{
    const getData = async ()=>{
      setLoadingWinner(true)
      const response = await rootStore.getLastDateWinner()
      setDataPlayer(response)
    }
    getData()
  }, [])

  return useObserver(()=>(
    <Dialog
      open={open}
      onClose={()=>{
        handleClose()
      }}
      aria-labelledby={rootStore.currentSlam}
      aria-describedby={rootStore.currentSlam}
    >
      <DialogTitle
        style={{ backgroundColor: '#40a1f2',
          color: 'wheat',}}
        onClose={()=>handleClose()}>
        <Typography variant="h6"> {rootStore.currentSlam} </Typography>

        <IconButton
          aria-label="close"
          onClick={()=>handleClose()}
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: '#fff',
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>


        {loadingWinner &&
        <div className={classes.loadingContainer}>
          <img src={Loading} alt="loading"/>
        </div>
        }

        <img src={Trophy} alt="Trophy" className={classes.logoContent}/>
        <span className={classes.headbandGround}>
         <Typography variant="h6"> {rootStore.player} </Typography>
          <img src={Headband} alt="Headband" className={classes.headband}/>
     </span>

        <Typography variant="h6" style={{
          display: 'flex',
          alignItems: 'center',
          color:'#40a1f2'
        }}>
          <DateRangeIcon/>
          {dataPlayer.lastDayWon}-{dataPlayer.lastMonthWon}-{dataPlayer.lastYearWon}
        </Typography>

      </DialogContent>


    </Dialog>
  ))
})

export default SlamDialog