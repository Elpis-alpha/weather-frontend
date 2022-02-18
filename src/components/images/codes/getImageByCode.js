import weatherConditions from './weather_conditions.json'

const getImageByCode = (code) => {
  
  const dataSet = weatherConditions.find(item => code === item.code)

  return dataSet

}

export default getImageByCode;