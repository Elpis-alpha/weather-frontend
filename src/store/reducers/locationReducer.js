const initState = {

  locationsData: [],

  available: false

}

const locationReducer = (state = initState, action) => {

  switch (action.type) {

    case "SAVE_LOCATION_AVAILABLE":

      return { ...state, available: action.payload }

    case "SAVE_LOCATION":

      return { ...state, locationsData: action.payload }

    case "ADD_LOCATION":

      state.locationsData.push(action.payload)

      return { ...state }

    case "DELETE_LOCATION":

      const newLocData = state.locationsData.filter(item => item._id !== action.payload) 

      return { ...state, locationsData: newLocData }

    default:

      return { ...state }

  }

}

export default locationReducer;