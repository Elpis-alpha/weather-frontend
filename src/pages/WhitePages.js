import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useSelector, useDispatch } from 'react-redux';

import SaveLocationComp from '../components/WhitePagesComponents/SaveLocationComp';

import SavedLocationsComp from '../components/WhitePagesComponents/SavedLocationsComp';

import SignupComp from '../components/WhitePagesComponents/SignupComp';

import LoginComp from '../components/WhitePagesComponents/LoginComp';

import WhiteLoaderComp from '../components/WhitePagesComponents/WhiteLoaderComp';

import { setShowWhite, setTextWhite, setAllWhite } from '../store/actions/whitePagesAction';

import { pageAnimation } from '../beautify/animations'

const WhitePages = () => {

  const dispatch = useDispatch()

  const { loadingText, loginWhite, signupWhite, saveWhite, savedWhite } = useSelector(state => state.white)

  const showLoader = !loginWhite.showLogin && !signupWhite.showSignup && !saveWhite.showSave && !savedWhite.showSaved

  const whiteOverflowHandler = () => {

    dispatch(setShowWhite(false))

    dispatch(setAllWhite(false))

    dispatch(setTextWhite(""))

  }

  return (

    <White variants={pageAnimation} initial="hidden" animate="show" exit="exit">

      <div className="white-overflow" onClick={whiteOverflowHandler} />

      <div className="white-content">

        {loginWhite.showLogin && <LoginComp />}

        {signupWhite.showSignup && <SignupComp />}

        {saveWhite.showSave && <SaveLocationComp />}

        {savedWhite.showSaved && <SavedLocationsComp />}

        {showLoader && <WhiteLoaderComp loadingText={loadingText} />}

      </div>

    </White>

  )

}


const White = styled(motion.div)`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 100vh;
  top: 0; left: 0;
  right: 0; bottom: 0;
  z-index: 20;
  font-family: "High Tower";
  
  .white-overflow{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 5;
    cursor: alias;
  }

  .white-content{
    width: 80%;
    max-width: 600px;
    /* min-height: 30%; */
    max-height: 80%;
    z-index: 10;
    margin: auto;
    background-color: white;
    box-shadow: 0 0 15px 0 black;
    border-radius: 2rem;
    padding: 2rem;
    overflow: auto;

    display: flex;
  }

  .white-content > div{
    width: 100%;
  }

`


export default WhitePages;