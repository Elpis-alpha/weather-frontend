const initState = {

  loginWhite: {

    showLogin: false,
    
    data: { username: '', password: '', error: '' }

  },

  signupWhite: {

    showSignup: false,

    data: { username: '', password: '', passwordX: '' }
    
  },

  saveWhite: {
    
    showSave: false,
    
    data: { name: '', latitude: '', longitude: '', error: '' }

  },

  savedWhite: {

    showSaved: false

  },

  showWhite: false,

  loadingText: "",

}


const whitePagesReducer = (state = initState, action) => {

  switch (action.type) {

    case "SET_WHITE":

      return { ...state, showWhite: action.payload }

    case "SET_LOADING_TEXT":

      return { ...state, loadingText: action.payload }

    case "SET_ALL_WHITE":

      const newState = {
        ...state, loginWhite: { ...state.loginWhite, showLogin: action.payload },
        signupWhite: { ...state.signupWhite, showSignup: action.payload },
        saveWhite: { ...state.saveWhite, showSave: action.payload },
        savedWhite: { ...state.savedWhite, showSaved: action.payload },
      }

      return newState

    case "SET_WHITE_LOGIN":

      return { ...state, loginWhite: { ...state.loginWhite, showLogin: action.payload } }

    case "SET_WHITE_LOGIN_DATA":

      return { ...state, loginWhite: { ...state.loginWhite, data: action.payload } }

    case "SET_WHITE_SIGNUP":

      return { ...state, signupWhite: { ...state.signupWhite, showSignup: action.payload } }

    case "SET_WHITE_SIGNUP_DATA":

      return { ...state, signupWhite: { ...state.signupWhite, data: action.payload } }

    case "SET_WHITE_SAVE":

      return { ...state, saveWhite: { ...state.saveWhite, showSave: action.payload } }

    case "SET_WHITE_SAVE_DATA":

      return { ...state, saveWhite: { ...state.saveWhite, data: action.payload } }

    case "SET_WHITE_SAVED":

      return { ...state, savedWhite: { ...state.savedWhite, showSaved: action.payload } }

    default:

      return { ...state }

  }

}

export default whitePagesReducer;