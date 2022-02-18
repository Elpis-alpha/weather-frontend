import styled from 'styled-components'

import { motion } from 'framer-motion'

import hurricane from '../images/hurricane.png'

const LogoDisplayComp = () => {

  return (

    <LogoDisplay>

      <div>

        <h1>

          Weather

        </h1>

        <img src={hurricane} alt="hurr" />

      </div>


    </LogoDisplay>

  )

}

const LogoDisplay = styled(motion.div)`

  font-size: 2.5rem;
  padding: 2rem;
  text-align: center;
  font-family: 'Redressed';
  padding-bottom: 1rem;

  h1{
    padding: 1rem;
    display: inline-block;
  }

  img{
    display: inline-block;
    width: 3rem;
  }

`

export default LogoDisplayComp;