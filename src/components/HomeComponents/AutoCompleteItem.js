import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useDispatch, } from 'react-redux';

import { setAcrText, setAcrShowMe } from '../../store/actions/autoCompleteAction';


const AutoCompleteItem = ({ id, name, country, region }) => {

  const dispatch = useDispatch()

  const specialId = `autocomplete-${id}`

  const fillFormData = () => { dispatch(setAcrText(region)); dispatch(setAcrShowMe(true)) }

  return (

    <AutoCompleteItemStyle id={specialId} onMouseDown={fillFormData}>

      <div className='holder-a'>

        <div className='name'>{name}</div>

        <div className='country'>{country}</div>

      </div>

      <div className='holder-b'>

        <div className='region'>{region}</div>

      </div>

    </AutoCompleteItemStyle>

  )

}


const AutoCompleteItemStyle = styled(motion.div)`
  background-color: transparent;
  border-bottom: 1px solid grey;
  cursor: pointer;
  padding: .2rem .5rem;
  transition: background-color .5s;

  &:hover{
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:focus{
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:last-child(){
    border-bottom: none;
  }

  .holder-a{
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name{
      text-align: left;
    }

    .country{
      text-align: right;
    }

  }

  .holder-b{
    /* text-align: center; */
    font-size: .8rem;
    font-weight: bold;
  }
`

export default AutoCompleteItem;