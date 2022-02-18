import axios from 'axios';

import { weatherURL } from '../api';


export const fetchWeaObject = (text) => async (dispatch) => {

  const items = await axios(weatherURL(text))

  dispatch({

    type: "FETCH_WEA_OBJECT",

    payload: items.data

  })

}


export const setWeaObject = (array) => async (dispatch) => {

  dispatch({

    type: "SET_WEA_OBJECT",

    payload: array

  })

}


export const setWeaShowMe = (showMe) => async (dispatch) => {

  dispatch({

    type: "SET_WEA_SHOWME",

    payload: showMe

  })

}


export const setWeaLoad = (value) => async (dispatch) => {

  if (value === undefined) { value = true }

  dispatch({

    type: "SET_WEA_LOAD",

    payload: value

  })

}

