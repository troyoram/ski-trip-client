import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Table, Button } from 'react-bootstrap'
import WeatherForm from '../../weather/components/WeatherForm.js'
import Weather from '../../weather/components/Weather.js'

const API_KEY = '10332ed7c8973d7100f0475d6f72c288'

class TripShow extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      trip: {
        location: '',
        date: '',
        equipment: ''
      }
    }
  }

  async componentDidMount(){
    const user = this.props.user
    const id = this.props.match.params.id
    const response = await axios({
      method: 'get',
      url: `${apiUrl}/trips/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
    const trip = response.data.trip
    this.setState({
      trip: trip
    })
  }

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: ''
  }

  // use OpenWeatherMap API to get current weather for city and country
  getWeather = async (event) => {
    event.preventDefault()
    const city = event.target.elements.city.value
    const country = event.target.elements.country.value
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`)
    const data = await api_call.json()
    if(data.cod == 404){
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter valid city and country names',
        min_temperature: undefined,
        max_temperature: undefined,
        icon: null,
        wind: undefined
      })
    } else if (city && country) {
      // console.log(data)
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter valid city and country names'
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2>Selected Trip:</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Location</th>
              <th>Date</th>
              <th>Equipment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.trip.id}</td>
              <td>{this.state.trip.location}</td>
              <td>{this.state.trip.date}</td>
              <td>{this.state.trip.equipment}</td>
            </tr>
          </tbody>
        </Table>
        <h2>Enter the nearest city and country to get current weather</h2>
        <WeatherForm getWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(TripShow)
