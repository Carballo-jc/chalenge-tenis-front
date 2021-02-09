import React, { useContext, useEffect } from 'react'
import {AppBar, Tab, Tabs, Box, Typography} from '@material-ui/core'
import {useObserver, observer} from 'mobx-react'
import { StoreContext } from '../App'
import SlamTabPanel from './SlamTabPanel'
import SlamDialog from './SlamDialog'


const SlamTabs = ()=>{
  const rootStore = useContext(StoreContext)
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = (event, index) => {
    setValue(index);
   rootStore.setCurrentSlam(rootStore.slams[index])
  };

  useEffect(()=>{
    setOpen(rootStore.openDialog)
  }, [rootStore.openDialog])


  return useObserver(()=>(
    <>
      {open && <SlamDialog open={open} handleClose={handleClose}/>}
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
          {
            rootStore.slams.map((slam, index)=>{
              return(
                <Tab
                  key={index}
                  label={slam}
                  id={`simple-tab-${index}`}
                  aria-controls={`simple-tabpanel-${index}`}
                />
              )
            })
          }
        </Tabs>
      </AppBar>


      {
        rootStore.slams.map((slam, index)=>{
          return(
            <SlamTabPanel setOpen={setOpen} key={index} slam={slam} index={index} value={value}/>
          )
        })
      }

    </>
  ))
}

export default SlamTabs