const initState = {

  available: false,

  data: {}

}


const userReducer = (state = initState, action) => {

  switch (action.type) {

    case "FETCH_USER":

      return { ...state, data: action.payload }

    case "SET_USER_DATA":

      return { ...state, data: action.payload, available: true }

    case "REMOVE_USER_DATA":

      return { ...state, data: {}, available: false }

    default:

      return { ...state }
  }

}

export default userReducer;