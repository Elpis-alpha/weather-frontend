export const setUserData = (data) => async (dispatch) => {

  dispatch({

    type: "SET_USER_DATA",

    payload: data

  })

}


export const removeUserData = () => async (dispatch) => {

  dispatch({

    type: "REMOVE_USER_DATA"

  })

}