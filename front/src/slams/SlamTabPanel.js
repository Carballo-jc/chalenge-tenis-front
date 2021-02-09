import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import {useObserver, observer} from 'mobx-react'
import Gorra from '../assets/gorra.png'
import { StoreContext } from '../App'

const SlamTabPanel = observer(  (props)=>{
  const [players, setPlayers] = useState([]);
  const rootStore = useContext(StoreContext)
  const { slam, value, index, setOpen, ...other } = props;



  useEffect(()=>{
    const getData = async ()=>{
      const response = await rootStore.getSlam(slam)
      setPlayers(response.name)
    }
    getData()
  }, [])

  return useObserver(()=>(
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >

      <ul
      style={{padding:0}}
      >
        {
          players.map((name, i)=>{
            return(
              <li
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  cursor:'pointer'
                }}
                key={i}
                onClick={
                  ()=>{
                    rootStore.setPlayer(name)
                    setOpen(true)
                  }
                }
              >
                <img src={Gorra} alt="vineta"/>
                <Typography
                  variant="body1"
                  style={{
                    color: '#284164',
                    fontSize: 20,
                    marginLeft: 15,
                  }}
                >
                  {name}
                </Typography>
              </li>
            )
          })
        }
      </ul>
    </div>
  ))
})

export default SlamTabPanel