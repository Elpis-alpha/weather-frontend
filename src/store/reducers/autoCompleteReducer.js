const initState = {

  data: [],

  showMe: false,

  text: "",

  loading: false,

  changeWeather: 0

}


const autoCompleteReducer = (state = initState, action) => {

  switch (action.type) {

    case "SET_ACR_LOAD":

      return { ...state, loading: true}

    case "FETCH_ACR_ARRAY":

      return { ...state, data: action.payload, loading: false}

    case "SET_ACR_ARRAY":

      return { ...state, data: action.payload, loading: false}

    case "SET_ACR_SHOWME":

      return { ...state, showMe: action.payload, data: [], loading: false, changeWeather: state.changeWeather + 1 }

    case "SET_ACR_TEXT":

      return { ...state, text: action.payload }

    default:

      return { ...state }
  }

}

export default autoCompleteReducer;