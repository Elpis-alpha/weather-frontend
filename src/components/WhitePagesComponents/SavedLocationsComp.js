import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'universal-cookie'

import { setAllWhite, setTextWhite, setLoginWhite, setSavedWhite } from '../../store/actions/whitePagesAction'

import { getUserURL, getAllLocationURL, logoutUserURL } from '../../store/api'

import { removeUserData, setUserData } from '../../store/actions/userAction'

import LocationItem from './LocationItem'

import { setLocationAvail, saveLocation } from '../../store/actions/locationAction'


const SavedLocationsComp = () => {

  const dispatch = useDispatch()

  const user = useSelector(store => store.user)

  const { locationsData, available } = useSelector(store => store.location)

  const cookie = new Cookies()

  useEffect(() => {

    if (user.available) {

      if (!available) {

        const token = cookie.get('user-token')

        new Promise(async resolve => {

          dispatch(setAllWhite(false))

          dispatch(setTextWhite("Fetching Saved Locations"))

          await new Promise(resolve => setTimeout(() => { resolve() }, 1000))

          let locations = await fetch(getAllLocationURL(), {

            method: 'GET',

            headers: {

              'Content-type': 'application/json',

              'Authorization': `Bearer ${token}`

            }

          })

          locations = await locations.json()

          dispatch(saveLocation(locations))

          dispatch(setLocationAvail(true))

          dispatch(setTextWhite("Redirecting to Saved Locations"))

          await new Promise(resolve => setTimeout(() => { resolve() }, 500))

          dispatch(setSavedWhite(true))

          resolve()

        })

      }

    } else {

      const token = cookie.get('user-token')

      if (token === undefined) {

        new Promise(async resolve => {

          dispatch(setAllWhite(false))

          dispatch(setTextWhite("Fetching User Data"))

          await new Promise(resolve => setTimeout(() => { resolve() }, 1000))

          dispatch(setTextWhite("Redirecting to Login"))

          await new Promise(resolve => setTimeout(() => { resolve() }, 1000))

          dispatch(setLoginWhite(true))

          resolve()

        })

      } else {

        new Promise(async resolve => {

          dispatch(setAllWhite(false))

          dispatch(setTextWhite("Authenticating User"))

          await new Promise(resolve => setTimeout(() => { resolve() }, 1000))

          let user = await fetch(getUserURL(), {

            method: 'GET',

            headers: {

              'Content-type': 'application/json',

              'Authorization': `Bearer ${token}`

            }

          })

          user = await user.json()

          if (user.error) {

            dispatch(setTextWhite("Redirecting to Login"))

            await new Promise(resolve => setTimeout(() => { resolve() }, 500))

            dispatch(setLoginWhite(true))

          } else {

            dispatch(setUserData({ user, token }))

            dispatch(setTextWhite("Redirecting to Saved Locations"))

            await new Promise(resolve => setTimeout(() => { resolve() }, 500))

            dispatch(setSavedWhite(true))

          }

          resolve()

        })

      }

    }

  })

  const logoutUser = async e => {

    e.preventDefault()

    const token = cookie.get('user-token')

    dispatch(setAllWhite(false))

    dispatch(setTextWhite("Logging out User"))

    await new Promise(resolve => setTimeout(() => { resolve() }, 1000))

    await fetch(logoutUserURL(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      }

    })

    cookie.set('user-token', undefined, { path: '/' })

    dispatch(saveLocation([]))

    dispatch(setLocationAvail(false))

    dispatch(removeUserData())

    dispatch(setLoginWhite(true))

  }

  return (

    <SavedLocations>

      <div className="intro">

        <h1>Hello {user.data.user && user.data.user.name}</h1>

        <p>The locations you have saved are listed down below!</p>

      </div>

      <div className="location-list">

        {locationsData.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).map(item =>

          <LocationItem id={item._id} key={item._id} name={item.name} isDeleted={false} longitude={item.longitude} latitude={item.latitude} />

        )}

        {locationsData.length < 1 && <div className='no-save'>You haven't saved any locations</div>}

      </div>

      <div className="logout"><button onClick={logoutUser}>Logout</button></div>

    </SavedLocations>

  )

}

const SavedLocations = styled(motion.div)`

display: flex;
color: black;
flex-direction: column;

.intro{
  padding-bottom: .3rem;
  
  h1{
    font-size: 2rem;
    line-height: 3rem;
  }

}

.no-save{
  font-size: 1rem;
  font-style: italic;
  padding: 1rem 0;
}

button{
  padding: .1rem 1rem;
  width: 100%;
  background-color: #cc4242;
  color: white;
  border: none; outline: none;
  border-radius: .3rem;
  cursor: pointer;
  transition: box-shadow .5s;
}

button:hover{
  box-shadow: 0 0 3px 0 red;
}

`

export default SavedLocationsComp;
