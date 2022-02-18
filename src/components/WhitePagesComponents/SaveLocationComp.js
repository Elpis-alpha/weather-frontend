import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'universal-cookie'

import { setAllWhite, setTextWhite, setLoginWhite, setSaveWhite, setSaveWhiteData, setSavedWhite } from '../../store/actions/whitePagesAction'

import { createLocationURL, getUserURL, getAllLocationURL } from '../../store/api'

import { setUserData } from '../../store/actions/userAction'

import { addLocation, setLocationAvail, saveLocation } from '../../store/actions/locationAction'


const SaveLocationComp = () => {

  const dispatch = useDispatch()

  const user = useSelector(store => store.user)

  const data = useSelector(store => store.white.saveWhite.data)

  const { longitude, latitude } = useSelector(store => store.weather.data)

  const { available } = useSelector(store => store.location)

  const cookie = new Cookies()

  useEffect(() => {

    if (user.available) {

      if (!available) {

        const token = cookie.get('user-token')

        new Promise(async resolve => {

          dispatch(setAllWhite(false))

          dispatch(setTextWhite("Fetching All Locations"))

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

          dispatch(setSaveWhite(true))

          resolve()

        })

      } else {

        if (data.error !== "") {

          setTimeout(() => {

            dispatch(setSaveWhiteData({ ...data, error: "" }))

          }, 1000)

        }

        dispatch(setSaveWhiteData({ ...data, name: "", longitude, latitude }))

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

            dispatch(setUserData(user))

            dispatch(setTextWhite("Redirecting to Save Location"))

            await new Promise(resolve => setTimeout(() => { resolve() }, 500))

            dispatch(setSaveWhite(true))

          }

          resolve()

        })

      }

    }

  }, [data.error])

  const locationName = e => {

    const input = e.currentTarget

    const inputText = input.value.trim()

    dispatch(setSaveWhiteData({ ...data, name: inputText }))

  }

  const saveLocationX = async e => {

    e.preventDefault()

    const token = cookie.get('user-token')

    if (data.name.length < 1) return false

    if (data.longitude === undefined) return dispatch(setSaveWhiteData({ ...data, error: "Search a location first" }))

    if (data.latitude === undefined) return dispatch(setSaveWhiteData({ ...data, error: "Search a location first" }))

    dispatch(setAllWhite(false))

    dispatch(setTextWhite("Saving Location"))

    await new Promise(resolve => setTimeout(() => { resolve() }, 1000))

    let location = await fetch(createLocationURL(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify({ name: data.name, latitude, longitude })

    })

    location = await location.json()

    dispatch(addLocation(location))

    dispatch(setTextWhite("Location Creation Successfull, Redirecting to Saved Locations"))

    await new Promise(resolve => setTimeout(() => { resolve() }, 500))

    dispatch(setSavedWhite(true))

  }

  return (

    <SaveLocation>

      <form onSubmit={saveLocationX} name='el-wea-loc'>

        <div className="form-title">

          <h1>Save your Locations</h1>

          <p>Save location details for easy accessibility in the future</p>

          {data.error !== "" && <div className='error-txt'>{data.error}</div>}

        </div>

        <div className="form-pack">

          <label htmlFor="el-xksvb">Location Name</label>

          <input required type="text" id='el-xksvb' onInput={locationName} placeholder='Enter a name' name='el-wea-locname' />

        </div>

        <div className="form-pack end">

          <button>Save Location</button>

        </div>

      </form>

    </SaveLocation>

  )

}

const SaveLocation = styled(motion.div)`

display: flex;
color: black;

form{

  width: 100%;
  
  .form-title{
    padding-bottom: .3rem;
    
    h1{
      font-size: 2rem;
      line-height: 3rem;
    }

    .error-txt{
      width: 50%;
      background-color: rgba(255, 0, 0, 0.3);
      margin: auto;
      text-align: center;
      padding: .2rem 1rem;
      border-radius: .5rem;
    }

  }

  .form-pack{
    width: 100%;
    padding-bottom: 1rem;

    label{
      display: block;
      width: 100%;
      font-weight: bold;
    }

    input{
      width: 100%;
      outline: none;
      border: 1px solid grey;
      padding: .1rem .5rem;
      border-radius: .3rem;
    }

  }

  .form-pack.end{
    padding: 0;

    button{
      padding: .1rem 1rem;
      width: 100%;
      background-color: #3c73e9;
      color: white;
      border: none; outline: none;
      border-radius: .3rem;
      cursor: pointer;
      transition: box-shadow .5s;
    }

    button:hover{
      box-shadow: 0 0 3px 0 blue;
    }
  }

}

`

export default SaveLocationComp;
