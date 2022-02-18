export const setLocationAvail = (value) => async (dispatch) => {

  dispatch({

    type: "SAVE_LOCATION_AVAILABLE",

    payload: value

  })

}


export const saveLocation = (locations) => async (dispatch) => {

  dispatch({

    type: "SAVE_LOCATION",

    payload: locations

  })

}


export const addLocation = (newLocation) => async (dispatch) => {

  dispatch({

    type: "ADD_LOCATION",

    payload: newLocation

  })

}


export const deleteLocation = (_id) => async (dispatch) => {

  dispatch({

    type: "DELETE_LOCATION",

    payload: _id

  })

}