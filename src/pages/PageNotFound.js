import styled from 'styled-components'

import { motion } from 'framer-motion'

import { pageAnimation } from '../beautify/animations'


const PageNotFound = () => {

  return (

    <Page404 variants={pageAnimation} initial="hidden" animate="show" exit="exit">

      <h1>Page not Found - 404</h1>

      <p>I thought I didn't exist, well I guess this confirms it</p>

    </Page404>

  )

}

const Page404 = styled(motion.div)`

padding: 0 1rem;
text-align: center;

h1{
  font-size: 2rem;
  line-height: 3rem;
  padding: 1rem 0;
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
}
`

export default PageNotFound;