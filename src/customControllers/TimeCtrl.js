
export const getNoDays = function (number, year) {

  switch (number) {
    case 1:
      if (year) {

        if (year % 4 === 0) {

          return 29

        } else {

          return 28

        }

      } else {

        return 28

      }
      

    case 4:
    case 0:
    case 2:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31
      ;

    case 3:
    case 5:
    case 8:
    case 10:
      return 30
      ;

    default:
      ;
  }

}

export const secondstoTimeStr = function (number, x) {

  let answer = number / 3600

  const hour = Math.floor(answer)

  answer = answer - hour

  answer = answer * 60

  const minute = Math.floor(answer)

  answer = answer - minute

  answer = answer * 60

  const second = Math.floor(answer)

  let stamp = hour >= 12 ? `pm` : `am`

  const newMinute = String(minute).length === 2 ? minute : `0${minute}`

  let newHour = hour > 12 ? (hour - 12) : hour

  newHour = hour === 0 ? 12 : newHour

  stamp = hour === 24 ? `am` : stamp

  return x === undefined ?
    `${newHour}:${newMinute}${stamp}` :
    `${newHour}:${newMinute}:${second}${stamp}`
}

export const timeListToMilSeconds = function (theList) {

  theList.map((a) => {
    return isNaN(parseInt(a)) ? a : parseInt(a)
  })

  let milliSec = 0

  if (theList.length === 3) {

    milliSec += theList[0] * 60 * 60 * 1000

    milliSec += theList[1] * 60 * 1000

    milliSec += theList[2] * 1000

  } else {

    let hr

    if (theList[3] === 'am') {
      if (theList[0] === 12) {
        hr = 0
      } else {
        hr = theList[0]
      }
    } else {
      if (theList[0] === 12) {
        hr = 24
      } else {
        hr = theList[0] + 12
      }
    }

    milliSec += hr * 60 * 60 * 1000

    milliSec += theList[1] * 60 * 1000

    milliSec += theList[2] * 1000

  }

  const returnValue = milliSec

  return returnValue
}

export const secondstoTimeList = function (number) {

  let answer = number / 3600

  const hour = Math.floor(answer)

  answer = answer - hour

  answer = answer * 60

  const minute = Math.floor(answer)

  answer = answer - minute

  answer = answer * 60

  const second = Math.floor(answer)

  return [hour, minute, second]
}

export const timetoSeconds = function (theDate) {
  const dateArray = [
    theDate.getHours() * 3600,
    theDate.getMinutes() * 60,
    theDate.getSeconds()
  ]

  let answer = 0

  for (const item of dateArray) {
    answer += item
  }

  return answer
}

export const getMonth = function (number) {

  switch (number) {
    case 0:
      return 'January'
      ;

    case 1:
      return 'February'
      ;

    case 2:
      return 'March'
      ;

    case 3:
      return 'April'

    case 4:
      return 'May'

    case 5:
      return 'June'

    case 6:
      return 'July'

    case 7:
      return 'August'

    case 8:
      return 'September'

    case 9:
      return 'October'

    case 10:
      return 'November'

    case 11:
      return 'December'

    default: break;
  }

}

export const getMonthNumber = function (month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]

  return months.indexOf(month)
}

export const addDateSuffix = function (dateX) {

  let date = dateX.toString()

  if (['11', '12', '13'].indexOf(date) !== -1) {
    date = date + 'th'
  } else if (date[date.length - 1] > '3') {
    date = date + 'th'
  } else if (date[date.length - 1] === '0') {
    date = date + 'th'
  } else if (date[date.length - 1] === '1') {
    date = date + 'st'
  } else if (date[date.length - 1] === '2') {
    date = date + 'nd'
  } else if (date[date.length - 1] === '3') {
    date = date + 'rd'
  }

  if (isNaN(parseInt(dateX))) { return dateX } else { return date }
}

export const getDayNumber = function (day) {

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednessday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  return days.indexOf(day)

}

export const getDay = function (number) {

  const num = parseInt(number)

  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednessday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  return days[num]

}

export const datetoTimeStr = function (theDate) {

  const acSeconds = timetoSeconds(theDate)

  const acTime = secondstoTimeStr(acSeconds)

  return acTime

}

export const datetoFullTimeStr = function (theDate) {

  const acSeconds = timetoSeconds(theDate)

  const acTime = secondstoTimeStr(acSeconds, 3)

  return acTime

}

export const getLeisureDate = function (date, theDate) {

  let returnValue

  if (date.getTime() === theDate.getTime()) {

    returnValue = 'Now'

  } else if (theDate.getTime() > date.getTime()) {

    const beginDate = (
      new Date(date.getTime() - (timetoSeconds(date) * 1000))
    ).getTime() - 1000

    if (theDate.getTime() < (beginDate + 86400000)) {

      returnValue = 'Today'

    } else if (
      theDate.getTime() > (beginDate + 86400000) &&
      theDate.getTime() < (beginDate + (86400000 * 2))
    ) {

      returnValue = 'Tommorow'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 2)) &&
      theDate.getTime() < (beginDate + (86400000 * 3))
    ) {

      returnValue = 'Two Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 3)) &&
      theDate.getTime() < (beginDate + (86400000 * 4))
    ) {

      returnValue = 'Three Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 4)) &&
      theDate.getTime() < (beginDate + (86400000 * 5))
    ) {

      returnValue = 'Four Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 5)) &&
      theDate.getTime() < (beginDate + (86400000 * 6))
    ) {

      returnValue = 'Five Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 6)) &&
      theDate.getTime() < (beginDate + (86400000 * 7))
    ) {

      returnValue = 'Six Days'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 7)) &&
      theDate.getTime() < (beginDate + (86400000 * 14))
    ) {

      returnValue = 'Two Weeks'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 14)) &&
      theDate.getTime() < (beginDate + (86400000 * 21))
    ) {

      returnValue = 'Three Weeks'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 21)) &&
      theDate.getTime() < (beginDate + (86400000 * 28))
    ) {

      returnValue = 'Four Weeks'

    } else if (
      theDate.getTime() > (beginDate + (86400000 * 28))
    ) {

      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`

    } else {
      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
    }


  } else if (theDate.getTime() < date.getTime()) {

    const beginDate = (
      new Date(date.getTime() - (timetoSeconds(date) * 1000))
    ).getTime() - 1000

    if (
      theDate.getTime() < (beginDate + 86400000) &&
      theDate.getTime() > (beginDate)
    ) {

      returnValue = 'Today'

    } else if (
      theDate.getTime() < (beginDate) &&
      theDate.getTime() > (beginDate - 86400000)
    ) {

      returnValue = 'Yesterday'

    } else if (
      theDate.getTime() < (beginDate - 86400000) &&
      theDate.getTime() > (beginDate - (86400000 * 2))
    ) {

      returnValue = 'Two Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 2)) &&
      theDate.getTime() > (beginDate - (86400000 * 3))
    ) {

      returnValue = 'Three Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 3)) &&
      theDate.getTime() > (beginDate - (86400000 * 4))
    ) {

      returnValue = 'Four Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 4)) &&
      theDate.getTime() > (beginDate - (86400000 * 5))
    ) {

      returnValue = 'Five Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 5)) &&
      theDate.getTime() > (beginDate - (86400000 * 6))
    ) {

      returnValue = 'Six Days Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 6)) &&
      theDate.getTime() > (beginDate - (86400000 * 13))
    ) {

      returnValue = 'Two Weeks Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 13)) &&
      theDate.getTime() > (beginDate - (86400000 * 20))
    ) {

      returnValue = 'Three Weeks Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 20)) &&
      theDate.getTime() > (beginDate - (86400000 * 27))
    ) {

      returnValue = 'Four Weeks Ago'

    } else if (
      theDate.getTime() < (beginDate - (86400000 * 27))
    ) {

      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`

    } else {
      returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
    }


  } else {
    returnValue = `${addDateSuffix(theDate.getDate())} ${getMonth(theDate.getMonth())}`
  }

  return returnValue

}

export const datetoDateStr = function (theDate) {

  return `${addDateSuffix(theDate.getDate())} of ${getMonth(theDate.getMonth())}, ${theDate.getFullYear()}`

}

export const timeBetweenDatesW = function (date1, date2) {

  let returnValue

  const a = date1.getTime()

  const b = date2.getTime()

  const c = Math.abs(a - b)

  if (c <= 10000) {

    returnValue = ['Now', c]

  } else if (c > 10000 && c < 50000) {

    returnValue = [Math.floor(c / 1000) + 's', c]

  } else if (c >= 50000 && c <= 3540000) {

    returnValue = [Math.ceil(c / 60000) + 'm', c]

  } else if (c > 3540000 && c <= 82800000) {

    returnValue = [Math.ceil(c / 3600000) + 'h', c]

  } else if (c > 82800000 && c <= 604800000) {

    returnValue = [Math.ceil(c / 86400000) + 'd', c]

  } else {

    returnValue = [date2.toLocaleDateString(), c]

  }

  return returnValue

}
