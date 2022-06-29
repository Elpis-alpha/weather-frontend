import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useSelector, useDispatch } from 'react-redux'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useState, useEffect } from 'react'

import Cookies from 'universal-cookie'

import { setAllWhite, setTextWhite, setSignupWhite, setLoginWhiteData, setLoginWhite, setSavedWhite } from '../../store/actions/whitePagesAction'

import { loginUserURL } from '../../store/api'

import { setUserData } from '../../store/actions/userAction'


const LoginComp = () => {

  const dispatch = useDispatch()

  const cookie = new Cookies()

  const { data } = useSelector(store => store.white.loginWhite)

  const [passwordShow, setPasswordShow] = useState("password")

  const openSignup = async () => {

    dispatch(setAllWhite(false))

    dispatch(setTextWhite("Redirecting to Sign up"))

    await new Promise(resolve => setTimeout(() => { resolve() }, 1000))

    dispatch(setSignupWhite(true))

  }

  const togglePassword = () => {

    if (passwordShow === "password") setPasswordShow("text")

    else setPasswordShow("password")

  }

  const usernameInput = (e) => {

    const input = e.currentTarget

    const inputText = input.value.trim()

    dispatch(setLoginWhiteData({ ...data, username: inputText }))

  }

  const passwordInput = (e) => {

    const input = e.currentTarget

    const inputText = input.value.trim()

    dispatch(setLoginWhiteData({ ...data, password: inputText }))

  }

  const loginUser = async e => {

    e.preventDefault()

    if (data.username.length < 1) return false

    if (data.password.length < 1) return false

    dispatch(setAllWhite(false))

    dispatch(setTextWhite("Authenticating Credentials"))

    let user = await fetch(loginUserURL(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

      },

      body: JSON.stringify({ name: data.username, password: data.password })

    })

    user = await user.json()

    if (user.error) {

      dispatch(setLoginWhiteData({ ...data, error: "Invalid Credentials" }))

      dispatch(setTextWhite("Redirecting to Login"))

      await new Promise(resolve => setTimeout(() => { resolve() }, 500))

      dispatch(setLoginWhite(true))

    } else {

      dispatch(setUserData(user))

      dispatch(setTextWhite("Redirecting to Saved Locations"))

      await new Promise(resolve => setTimeout(() => { resolve() }, 500))

      dispatch(setSavedWhite(true))

      cookie.set('user-token', user.token, { path: '/', expires: new Date(90 ** 7) })

    }

  }

  useEffect(() => {

    if (data.error !== "") {

      setTimeout(() => {

        dispatch(setLoginWhiteData({ ...data, error: "" }))

      }, 1000)

    }

  })

  return (

    <Login>

      <form onSubmit={loginUser} name='el-wea-login'>

        <div className="form-title">

          <h1>Welcome back</h1>

          <p>We have been expecting you! Please enter your details</p>

          {data.error !== "" && <div className='error-txt'>{data.error}</div>}

        </div>

        <div className="form-pack">

          <label htmlFor="el-xks">Username</label>

          <input required onInput={usernameInput} type="text" id='el-xks' placeholder='Enter your username' name='el-wea-username' />

        </div>

        <div className="form-pack">

          <label htmlFor="el-sdv">Password</label>

          <input required type={passwordShow} onInput={passwordInput} id='el-sdv' name='el-wea-password' placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />

          <div className="eye-icon"><div onClick={togglePassword}>

            {passwordShow === "password" && <FontAwesomeIcon icon={faEye} />}

            {passwordShow === "text" && <FontAwesomeIcon icon={faEyeSlash} />}

          </div></div>

        </div>

        <div className="form-pack end">

          <button>Login</button>

        </div>

        <div className="change-auth">

          <span>Don't have an account? </span>

          <span className='link-me' onClick={openSignup}>Sign up</span>

        </div>

      </form>

    </Login>

  )

}

const Login = styled(motion.div)`

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

    .change-auth{
      width: 100%;
      text-align: center;
      padding-top: .5rem;

      span.link-me{
        display: inline-block;
        color: #3c73e9;
        cursor: pointer;
      }

      span.link-me:hover{
        text-decoration: underline;
      }
    }

    .eye-icon{
      position: absolute;
      right: 0; top: 0;
      height: 100%;
      padding-top: 1.6rem;
      padding-bottom: 1rem;
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      
      div{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;        
        cursor: pointer;
      }
    }

  }

`

export default LoginComp;
