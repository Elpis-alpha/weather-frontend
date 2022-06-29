import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useDispatch } from 'react-redux';

import { setAcrText, setAcrShowMe } from '../../store/actions/autoCompleteAction';

import { setShowWhite, setTextWhite, setSavedWhite, setSaveWhite } from '../../store/actions/whitePagesAction';


const SpecialButtonsComp = () => {

  const dispatch = useDispatch()

  const useLocationHandler = e => {

    const btn = e.currentTarget

    btn.disabled = true

    if (!navigator.geolocation) {

      return alert('Geolocation is not supported by your browser.')

    }

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = Math.round(position.coords.latitude)

      const lon = Math.round(position.coords.longitude)

      const text = `Latitude:->${lat}, Longitude:->${lon}`

      dispatch(setAcrText(text))

      dispatch(setAcrShowMe(true))

      btn.disabled = false

    })

  }

  const savedLocationsHandler = () => {

    dispatch(setShowWhite(true))

    dispatch(setSavedWhite(true))

    dispatch(setTextWhite("Fetching Saved Locations"))

  }

  const saveLocationHandler = () => {

    dispatch(setShowWhite(true))

    dispatch(setSaveWhite(true))

    dispatch(setTextWhite("Fetching User Data"))

  }

  return (

    <SpecialButtons>

      <button onClick={useLocationHandler}>Use Location</button>

      <button onClick={savedLocationsHandler} >Saved Locations</button>

      <button onClick={saveLocationHandler}>Save Location</button>

    </SpecialButtons>

  )

}

const SpecialButtons = styled(motion.div)`

  width: 90%;
  margin: 0 auto;
  padding: 1rem;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button{
    padding: .1rem 1rem;
    background-color: #efefef;
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, .2), -2px -2px 5px 0 #fff;
    border: none; outline: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transform: scale(1);
    transition: transform .5s;
  }
  
  button:hover{
    transform: scale(1.1);
  }
  
  button:disabled{
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled:hover{
    opacity: 0.5;
    transform: scale(1);
  }

`

export default SpecialButtonsComp;