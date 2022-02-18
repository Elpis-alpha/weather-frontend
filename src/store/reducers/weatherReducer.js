const initState = {

  data: {},

  loading: false,

  showMe: false

}


const weatherReducer = (state = initState, action) => {

  switch (action.type) {

    case "SET_WEA_LOAD":

      return { ...state, loading: action.payload, showMe: false }

    case "FETCH_WEA_OBJECT":

      return { ...state, data: action.payload, loading: false, showMe: true }

    case "SET_WEA_OBJECT":

      return { ...state, data: action.payload, loading: false }

    case "SET_WEA_SHOWME":

      return { ...state, showMe: action.payload }

    default:

      return { ...state }
  }

}

export default weatherReducer;