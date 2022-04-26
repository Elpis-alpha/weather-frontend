import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { useRef, useState } from 'react'

import Cookies from 'universal-cookie'

import { setAllWhite, setTextWhite, setLoginWhite, setSignupWhiteData, setSavedWhite } from '../../store/actions/whitePagesAction'

import { userDuplicateURL, createUserURL } from '../../store/api'

import { setUserData } from '../../store/actions/userAction'



const SignupComp = () => {

  const dispatch = useDispatch()

  const cookie = new Cookies()

  const usernameRef = useRef(null)

  const passwordRef = useRef(null)

  const passwordXRef = useRef(null)

  const [passwordShow, setPasswordShow] = useState("password")

  const [passwordXShow, setPasswordXShow] = useState("password")

  const { data } = useSelector(store => store.white.signupWhite)

  const openLogin = async () => {

    dispatch(setAllWhite(false))

    dispatch(setTextWhite("Redirecting to Log in"))

    await new Promise(resolve => setTimeout(() => { resolve() }, 1000))

    dispatch(setLoginWhite(true))

  }

  const togglePassword = () => {

    if (passwordShow === "password") setPasswordShow("text")

    else setPasswordShow("password")

  }

  const toggleXPassword = () => {

    if (passwordXShow === "password") setPasswordXShow("text")

    else setPasswordXShow("password")

  }

  const validateUsername = async e => {

    const input = e.currentTarget

    let userExists = await fetch(userDuplicateURL(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

      },

      body: JSON.stringify({ name: input.value.trim() })

    })

    userExists = await userExists.json()

    dispatch(setSignupWhiteData({ ...data, username: input.value.trim() }))

    if (userExists.message === "user exists") {

      input.classList.remove('good')

      input.classList.add('bad')

      usernameRef.current.innerText = "Username Taken"

    } else {

      input.classList.remove('bad')

      input.classList.add('good')

      usernameRef.current.innerText = ""

    }

  }

  const validatePassword = async e => {

    const input = e.currentTarget

    const inputName = input.name === "el-wea-passwordx-signup" ? 'X' : 'O'


    if (inputName === 'X') { dispatch(setSignupWhiteData({ ...data, passwordX: input.value.trim() })) }

    else if (inputName === 'O') { dispatch(setSignupWhiteData({ ...data, password: input.value.trim() })) }


    if (input.value.trim().length < 5) {

      input.classList.remove('good')

      input.classList.add('bad')

      input.nextElementSibling.nextElementSibling.innerText = "Password is too short"

    } else if (input.value.trim() !== data.passwordX && inputName !== "X") {

      input.classList.remove('bad')

      input.classList.add('good')

      passwordRef.current.innerText = ""

      passwordXRef.current.innerText = "Passwords don't match"

      passwordXRef.current.previousElementSibling.previousElementSibling.classList.remove('good')

      passwordXRef.current.previousElementSibling.previousElementSibling.classList.add('bad')

    } else if (input.value.trim() !== data.password && inputName !== "O") {

      input.classList.remove('bad')

      input.classList.add('good')

      passwordXRef.current.innerText = ""

      passwordRef.current.innerText = "Passwords don't match"

      passwordRef.current.previousElementSibling.previousElementSibling.classList.remove('good')

      passwordRef.current.previousElementSibling.previousElementSibling.classList.add('bad')

    } else {

      passwordRef.current.innerText = ""

      passwordXRef.current.innerText = ""

      passwordRef.current.previousElementSibling.previousElementSibling.classList.remove('bad')

      passwordRef.current.previousElementSibling.previousElementSibling.classList.add('good')

      passwordXRef.current.previousElementSibling.previousElementSibling.classList.remove('bad')

      passwordXRef.current.previousElementSibling.previousElementSibling.classList.add('good')

    }

  }

  const createUser = async e => {

    e.preventDefault()

    let userExists = await fetch(userDuplicateURL(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

      },

      body: JSON.stringify({ name: data.username })

    })

    userExists = await userExists.json()
    
    if (userExists.message !== 'user does not exist') return false

    if (data.password.length < 5) return false

    if (data.password !== data.passwordX) return false

    dispatch(setAllWhite(false))

    dispatch(setTextWhite("Creating Account"))
    
    await new Promise(resolve => setTimeout(() => { resolve() }, 1000))

    let user = await fetch(createUserURL(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

      },

      body: JSON.stringify({ name: data.username, password: data.password })

    })

    user = await user.json()

    dispatch(setUserData(user))

    dispatch(setTextWhite("Account Creation Successfull, Redirecting to Saved Locations"))

    await new Promise(resolve => setTimeout(() => { resolve() }, 500))

    dispatch(setSavedWhite(true))

    cookie.set('user-token', user.token, { path: '/', expires: new Date(90 ** 7) })

  }

  return (

    <Signup>

      <form onSubmit={createUser} name='el-wea-signup'>

        <div className="form-title">

          <h1>Sign Up</h1>

          <p>We have been waiting for people like you! Please enter your details</p>

        </div>

        <div className="form-pack">

          <label htmlFor="el-xksc">Username</label>

          <input required type="text" id='el-xksc' onBlur={validateUsername} placeholder='Enter your username' name='el-wea-username-signup' />

          <small className="valid-error" ref={usernameRef}></small>

        </div>

        <div className="form-pack">

          <label htmlFor="el-sdvcv">Password</label>

          <input required type={passwordShow} id='el-sdvcv' onInput={validatePassword} name='el-wea-password-signup' placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />

          <div className="eye-icon"><div onClick={togglePassword}>

            {passwordShow === "password" && <FontAwesomeIcon icon={faEye} />}

            {passwordShow === "text" && <FontAwesomeIcon icon={faEyeSlash} />}

          </div></div>

          <small className="valid-error" ref={passwordRef}></small>

        </div>

        <div className="form-pack">

          <label htmlFor="el-sdvcvx">Confirm Password</label>

          <input required type={passwordXShow} onInput={validatePassword} id='el-sdvcvx' name='el-wea-passwordx-signup' placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />

          <div className="eye-icon"><div onClick={toggleXPassword}>

            {passwordXShow === "password" && <FontAwesomeIcon icon={faEye} />}

            {passwordXShow === "text" && <FontAwesomeIcon icon={faEyeSlash} />}

          </div></div>

          <small className="valid-error" ref={passwordXRef}></small>

        </div>

        <div className="form-pack end">

          <button>Sign up</button>

        </div>

        <div className="change-auth">

          <span>Already have an account? </span>

          <span className='link-me' onClick={openLogin}>Log in</span>

        </div>

      </form>

    </Signup>

  )

}

const Signup = styled(motion.div)`

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
        transform: background-color .5s, border .5s;
      }

      input.bad{
        border: 1px solid rgba(255, 0, 0, 0.5);
        background-color: rgba(255, 0, 0, 0.05);
      }

      input.good{
        border: 1px solid rgba(0, 255, 0, 0.5);
        background-color: rgba(0, 255, 0, 0.05);
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

    .valid-error{
      position: absolute;
      bottom: 0; left: 0;
      line-height: 1rem;
      text-align: center;
      right: 0;
      color: red;
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

export default SignupComp;
