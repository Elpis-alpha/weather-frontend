import styled from 'styled-components'

import { motion } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { useDispatch } from 'react-redux'
import { setAllWhite, setShowWhite } from '../../store/actions/whitePagesAction'
import { setAcrShowMe, setAcrText } from '../../store/actions/autoCompleteAction'
import { useState } from 'react'
import { deleteLocationURL } from '../../store/api'
import { deleteLocation } from '../../store/actions/locationAction'
import Cookies from 'universal-cookie/es6'


const LocationItem = ({ id, name, isDeleted, longitude, latitude }) => {

  const dispatch = useDispatch()

  const cookie = new Cookies()

  const token = cookie.get('user-token')

  const [isDel, setIsDel] = useState(isDeleted)

  const deleteorGetLocation = async e => {

    if (e.target.classList.contains('holder-a')) {

      dispatch(setAllWhite(false))

      dispatch(setShowWhite(false))

      const text = `Latitude:->${latitude}, Longitude:->${longitude}`

      dispatch(setAcrText(text))

      dispatch(setAcrShowMe(true))

    } else {

      setIsDel(true)

      await new Promise(resolve => setTimeout(() => { resolve() }, 300))

      await fetch(deleteLocationURL(id), {

        method: 'DELETE',

        headers: {

          'Content-type': 'application/json',

          'Authorization': `Bearer ${token}`

        }

      })

      dispatch(deleteLocation(id))

    }

  }

  return (

    <LocationItemStyle onClick={deleteorGetLocation}>

      {!isDel && <>

        <div className='holder-a'>{name}</div>

        <div className='holder-b'>

          <FontAwesomeIcon icon={faTimes} color="red" />

        </div></>}

      {isDel && <div className='holder-a'>Deleting...</div>}

    </LocationItemStyle>

  )

}


const LocationItemStyle = styled(motion.div)`
  display: flex;
  background-color: transparent;
  border: 1px solid grey;
  cursor: pointer;
  transition: background-color .5s;
  border-radius: .2rem;
  justify-content: space-between;
  margin: .5rem 0;
  align-items: center;

  &:hover{
    background-color: rgba(0, 0, 0, 0.2);
  }


  &:last-child(){
    border-bottom: none;
  }

  .holder-a{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: .2rem .5rem;

    .name{
      text-align: left;
    }

    .country{
      text-align: right;
    }

  }

  .holder-b{
    font-size: .8rem;
    font-weight: bold;
    padding: 0 .5rem;
    z-index: 5;
    border-radius: .3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: .2rem;
    padding: .5rem;
  }
  
  .holder-b:hover{
    background-color: #ff9d9d;
  }
`

export default LocationItem;