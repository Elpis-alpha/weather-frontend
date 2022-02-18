import styled from 'styled-components'

import { motion } from 'framer-motion'

import { ThreeDots } from 'react-loader-spinner';

const WhiteLoaderComp = ({loadingText}) => {

  return (

    <WhiteLoader>

      <ThreeDots color='black' />

      {loadingText}

    </WhiteLoader>

  )

}
const WhiteLoader = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
`

export default WhiteLoaderComp;
