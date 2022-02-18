import axios from 'axios';

import { autocompleteURL } from '../api';


export const fetchAcrArray = (text) => async (dispatch) => {

  const items = await axios.get(autocompleteURL(text))

  dispatch({

    type: "FETCH_ACR_ARRAY",

    payload: items.data

  })

}


export const setAcrArray = (array) => async (dispatch) => {

  dispatch({

    type: "SET_ACR_ARRAY",

    payload: array

  })

}


export const setAcrShowMe = (showMe) => async (dispatch) => {

  dispatch({

    type: "SET_ACR_SHOWME",

    payload: showMe

  })

}


export const setAcrLoad = () => async (dispatch) => {

  dispatch({

    type: "SET_ACR_LOAD",

  })

}


export const setAcrText = (text) => async (dispatch) => {

  dispatch({

    type: "SET_ACR_TEXT",

    payload: text

  })

}
