import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { motion } from 'framer-motion'

import { useDispatch, useSelector } from 'react-redux';

import { Bars } from 'react-loader-spinner';

import AutoCompleteItem from './AutoCompleteItem';

import { fetchAcrArray, setAcrArray, setAcrText, setAcrShowMe, setAcrLoad } from '../../store/actions/autoCompleteAction';

import { useState } from 'react';


const FormDisplayComp = () => {

  const dispatch = useDispatch()

  const [showAuto, setShowAuto] = useState(false)

  const { data, text, loading } = useSelector(state => state.autoComplete)

  const autoCompleteHandler = async e => {

    dispatch(setAcrText(e.target.value))

    if (e.target.value.trim() === "") return dispatch(setAcrArray([]))

    dispatch(setAcrLoad())

    dispatch(fetchAcrArray(e.target.value.trim()))

    setShowAuto(true)

  }

  const removeAutoCompleteHandler = e => dispatch(setAcrArray([]))

  const sendForm = e => { e.preventDefault(); dispatch(setAcrShowMe(true)); setShowAuto(false) }

  return (

    <FormDisplay>

      <div>

        <form onSubmit={sendForm}>

          <input type="text" placeholder='Search Location...' autoComplete='off' required value={text} onInput={autoCompleteHandler} onBlur={removeAutoCompleteHandler} />

          <button><FontAwesomeIcon icon={faSearch} /></button>

        </form>

        <div className="autocomplete-holder">

          {(showAuto && loading) && <Bars color='black' wrapperClass='loader-holder' width="2rem" height="1.6rem" />}

          {(showAuto && !loading) && data.map(item => <AutoCompleteItem country={item.country} region={item.region} name={item.name} key={item.id} id={item.id} />)}

        </div>

      </div>

    </FormDisplay>

  )

}


const FormDisplay = styled(motion.div)`

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  div{
    
    width: 100%;
    display: block;
    
    form{
      
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
      margin: auto;

      input{
        flex: 1;
        padding: .5rem 1rem;
        border: none; outline: none;
        border-radius: 2rem 0 0  2rem;
        box-shadow: 0 0 3px 0 black;
        transition: box-shadow .5s;
        
        &:focus{
          box-shadow: 0 0 3px 0 blue;
        }

      }

    
      
      button{
        /* margin-left: 1rem; */
        padding: .5rem 1.5rem;
        border: none; 
        border-radius: 0 2rem 2rem 0;
        box-shadow: 0 0 3px 0 black;
        cursor: pointer;
        height: 100%;
      }
      
    }
    
  }

  div.autocomplete-holder{
    background-color: white;
    width: calc(90% - 2rem);
    margin: 0 auto;
    margin-top: .5rem;
    box-shadow: 0 0 2px 0 black;
    position: absolute;
    top: 100%;
    left: calc(5% + 1rem);
    z-index: 10;

    .loader-holder{
      display: flex;
      padding: .5rem;
      align-items: center;
      justify-content: center;
    }
  }

`


export default FormDisplayComp;