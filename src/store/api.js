const host = process.env.REACT_APP_BACK_END

export const googleMapUrl = (lon, lat) => `https://google.com/maps?q=${lon},${lat}`

export const autocompleteURL = (text) => `${host}/api/weather/autocomplete?location=${text}`

export const weatherURL = (text) => `${host}/api/weather/address?location=${text}`

export const userDuplicateURL = () => `${host}/api/users/user`

export const createUserURL = () => `${host}/api/users`

export const loginUserURL = () => `${host}/api/users/login`

export const logoutUserURL = () => `${host}/api/users/logout`

export const getUserURL = () => `${host}/api/users/user`

export const createLocationURL = () => `${host}/api/location`

export const getAllLocationURL = () => `${host}/api/location`

export const deleteLocationURL = (id) => `${host}/api/location/${id}`
