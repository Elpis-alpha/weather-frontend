import styled from 'styled-components'

import { motion } from 'framer-motion'

import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'

import { TailSpin as Circles } from 'react-loader-spinner';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchWeaObject, setWeaLoad, setWeaShowMe } from '../../store/actions/weatherAction'

import { setAcrShowMe } from '../../store/actions/autoCompleteAction'

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

  const headRemoveDisplay = e => {

    if (e.target.classList.contains('w-d-elx')) {

      dispatch(setAcrShowMe(false))

      dispatch(setWeaShowMe(false))

    }

  }

  return (

    <WeatherDisplay className={showWeather ? "show w-d-elx" : "w-d-elx"} onClick={headRemoveDisplay}>

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

          <div className="overlay"></div>

          <img src={`${process.env.PUBLIC_URL}/images/codes/${getImageByCode(data.weatherCode).url}`} alt={data.weatherText} />

        </div>

        {/* <p className='caption'>Photographic Representation of {data.weatherText} Weather</p> */}

      </div>}

      {loading && <div className="weather-loader">

        <Circles height="3rem" width="3rem" color='#fff' wrapperClass='loader-holder' />

      </div>}

      <div className="cancel-x" onClick={() => { dispatch(setAcrShowMe(false)); dispatch(setWeaShowMe(false)) }}>

        <FontAwesomeIcon icon={faTimes} />

      </div>

    </WeatherDisplay>

  )

}

const WeatherDisplay = styled(motion.div)`

  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  z-index: 55;
  overflow: auto;
  padding: 1rem 4rem;
  padding-top: .5rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  font-family: "High Tower";
  background-color: rgba(0, 0, 0, .4);
  color: #fff;
  font-size: 1rem;
  line-height: 1.8rem;
  animation: opacity-in .5s 1;

  .weather-data{

    width: 80%;
    max-width: 600px;
    /* min-height: 30%; */
    max-height: 80%;
    z-index: 10;
    margin: auto;
    background-color: white;
    box-shadow: 0 0 15px 0 black;
    /* border-radius: 2rem; */
    padding: 1rem 2rem;
    overflow: auto;

    display: flex;
    align-items: center;
    /* justify-content: center; */
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
        height: 1px;
        width: 100%;
        background-color: #fff;
      }

      .loc-sub:last-child{
        text-align: center;
      }
      
      .sub-head{
        font-size: 1.4rem;
        line-height: 2.5rem;
        /* font-size: 1rem; */
        /* font-weight: bold; */
      }

      label{
        /* font-weight: bold; */
      }
      padding: 1rem 0;
    }
    
    .image{
      /* width: 70%; */
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;

      img{
        margin: 0 auto;
        display: block;
        width: 100%;
        height: 100%;
        /* max-height: 50vh; */
        z-index: 5;
        box-shadow: 0 0 3px 0 black;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, .7);
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

  .cancel-x {
    position: absolute;
    top: 2rem; right: 2rem;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    color: red;
    z-index: 40;
    cursor: pointer;
    transform: scale(1);
    transition: transform .5s;

    svg {
      width: inherit;
      height: inherit;
    }

    &:hover {
      transform: scale(1.5);
    }
  }
`

export default WeatherDisplayComp;