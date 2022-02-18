import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useSelector } from 'react-redux';

import { pageAnimation } from '../beautify/animations'

import LogoDisplayComp from '../components/HomeComponents/LogoDisplayComp'

import FormDisplayComp from '../components/HomeComponents/FormDisplayComp'

import SpecialButtonsComp from '../components/HomeComponents/SpecialButtonsComp';

import WeatherDisplayComp from '../components/HomeComponents/WeatherDisplayComp';

import WhitePages from './WhitePages';


const HomePage = () => {

  const { showMe } = useSelector(state => state.autoComplete)

  const { showWhite } = useSelector(state => state.white)

  return (

    <Home variants={pageAnimation} initial="hidden" animate="show" exit="exit">

      {showWhite && <WhitePages />}

      <LogoDisplayComp />

      <FormDisplayComp />

      <SpecialButtonsComp />

      {showMe && <WeatherDisplayComp />}

    </Home>

  )

}

const Home = styled(motion.div)`

padding: 0 1rem;

`

export default HomePage