export const googleMapUrl = (lon, lat) => `https://google.com/maps?q=${lon},${lat}`

export const autocompleteURL = (text) => `/api/weather/autocomplete?location=${text}`

export const weatherURL = (text) => `/api/weather/address?location=${text}`

export const userDuplicateURL = () => `/api/users/user`

export const createUserURL = () => `/api/users`

export const loginUserURL = () => `/api/users/login`

export const logoutUserURL = () => `/api/users/logout`

export const getUserURL = () => `/api/users/user`

export const createLocationURL = () => `/api/location`

export const getAllLocationURL = () => `/api/location`

export const deleteLocationURL = (id) => `/api/location/${id}`
