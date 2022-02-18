import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'

import { Circles } from 'react-loader-spinner';

import { fetchWeaObject, setWeaLoad } from '../../store/actions/weatherAction'

import getImageByCode from '../images/codes/getImageByCode';

import { datetoTimeStr } from '../../customControllers/TimeCtrl';

const WeatherDisplayComp = () => {

  const dispatch = useDispatch()
  
  const { text, showMe, changeWeather } = useSelector(state => state.autoComplete)
  
  const { data, loading, showMe: showWeather } = useSelector(state => state.weather)

  useEffect(() => {

    if (showMe) {

      dispatch(setWeaLoad(true))

      dispatch(fetchWeaObject(text))

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeWeather])

  return (

    <WeatherDisplay>

      {showWeather && <div className="weather-data">

        <div className='heading'>

          <h1>{data.weatherText}</h1>

        </div>

        <div className='loc'>

          <div className="loc-sub">

            <div className="sub-head">Address</div>

            <div>

              <label>Region: </label>{data.region}

            </div>

            <div>

              <label>Country: </label>{data.country}

            </div>

          </div>

          <div className="loc-sub">

            <div className="sub-head">Coordinates</div>

            <div>

              <label>Latitude: </label>{data.longitude}

            </div>

            <div>

              <label>Longitude: </label>{data.latitude}

            </div>

          </div>

        </div>

        <div className='loc'>

          <div className="loc-sub">

            <div className="sub-head">Temperature</div>

            <div>

              <label>Celcius: </label>{data.tempCelcius} <sup>O</sup>C ({data.tempCelcius_f} <sup>O</sup>C)

            </div>

            <div>

              <label>Farenheight: </label>{data.tempFaren} <sup>O</sup>F ({data.tempFaren_f} <sup>O</sup>F)

            </div>

          </div>

          <div className="loc-sub">

            <div className="sub-head">Time</div>

            <div>

              <label>Local Time: </label> {datetoTimeStr(new Date(data.localTime))}

            </div>

            <div>

              <label>Taken at: </label>{datetoTimeStr(new Date(data.lastUpdated))}

            </div>

          </div>

        </div>

        <div className='loc'>

          <div className="loc-sub">

            <div className="sub-head">Wind Speed - {data.windDirection}</div>

            <div>

              <label>Metric: </label>{data.windSpeedKPH + ' Km/Hr'}

            </div>

            <div>

              <label>Imperial: </label>{data.windSpeedMPH + ' Mile/Hr'}

            </div>

          </div>

          <div className="loc-sub">

            <div className="sub-head">Gust Speed - {data.windDirection}</div>

            <div>

              <label>Metric: </label>{data.gustSpeedKPH + ' Km/Hr'}

            </div>

            <div>

              <label>Imperial: </label>{data.gustSpeedMPH + ' Mile/Hr'}

            </div>

          </div>
        </div>

        <div className='image'>

          <img src={`${process.env.PUBLIC_URL}/images/codes/${getImageByCode(data.weatherCode).url}`} alt={data.weatherText} />

        </div>

        <p className='caption'>Photographic Representation of {data.weatherText} Weather</p>

      </div>}

      {loading && <div className="weather-loader">

        <Circles height="5rem" width="5rem" color='#7c7c7c' wrapperClass='loader-holder' />

      </div>}


    </WeatherDisplay>

  )

}

const WeatherDisplay = styled(motion.div)`

  padding: 1rem 4rem;
  padding-top: .5rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  font-family: 'Poor Richard';
  
  .weather-data{
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    
    .heading{
      font-size: 2rem;
      width: 100%;
      font: bold;
      text-align: center;
      padding-top: 1rem;
      padding-bottom: .5rem;
    }
    
    .loc{
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      text-align: center;

      sup{font-size: .5rem;}

      .loc-sub{
        width: 40%;
      }

      .sub-head::after{
        content: "";
        position: absolute;
        bottom: 0;
        left: 0; right: 0;
        height: 2px;
        width: 100%;
        background-color: #00008e;
      }

      .loc-sub:last-child{
        text-align: center;
      }
      
      .sub-head{
        font-size: 1rem;
        font-weight: bold;
      }

      label{
        font-weight: bold;
      }
      padding: 1rem 0;
    }
    
    .image{
      width: 70%;

      img{
        margin: 0 auto;
        display: block;
        max-width: 100%;
        /* max-height: 50vh; */
        box-shadow: 0 0 3px 0 black;
      }
    }

    .caption{
      padding: .2rem 1rem;
    }

  }

  .weather-loader{
    width: 100%;
    min-height: 50vh;
    padding: 3rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default WeatherDisplayComp;