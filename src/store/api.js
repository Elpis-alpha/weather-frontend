export const googleMapUrl = (lon, lat) => `https://google.com/maps?q=${lon},${lat}`

export const autocompleteURL = (text) => `https://elpis-weather-app.herokuapp.com/api/weather/autocomplete?location=${text}`

export const weatherURL = (text) => `https://elpis-weather-app.herokuapp.com/api/weather/address?location=${text}`

export const userDuplicateURL = () => `https://elpis-weather-app.herokuapp.com/api/users/user`

export const createUserURL = () => `https://elpis-weather-app.herokuapp.com/api/users`

export const loginUserURL = () => `https://elpis-weather-app.herokuapp.com/api/users/login`

export const logoutUserURL = () => `https://elpis-weather-app.herokuapp.com/api/users/logout`

export const getUserURL = () => `https://elpis-weather-app.herokuapp.com/api/users/user`

export const createLocationURL = () => `https://elpis-weather-app.herokuapp.com/api/location`

export const getAllLocationURL = () => `https://elpis-weather-app.herokuapp.com/api/location`

export const deleteLocationURL = (id) => `https://elpis-weather-app.herokuapp.com/api/location/${id}`
