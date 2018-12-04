import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'

class TripNew extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      trip: {
        location: '',
        date: '',
        equipment: ''
      },
      flashMessage: ''
    }
    this.baseTrip = this.state.trip
  }

  handleChange = (event) => {
    const newTrip = { ...this.state.trip, [event.target.name]: event.target.value }
    this.setState({
      trip: newTrip
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const user = this.props.user
    const trip = this.state.trip
    const response = await axios({
      method: 'post',
      url: `${apiUrl}/trips`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        trip: trip
      }
    })
    this.props.history.push('/trips')
  }

  render() {
    return (
      <React.Fragment>
        <h2>Trip New:</h2>
        <p>{this.state.flashMessage}</p>
        <form>
          <input type='text' onChange={this.handleChange} value={this.state.trip.location} name='location' placeholder='location'/>
          <input type='date' onChange={this.handleChange} value={this.state.trip.date} name='date' placeholder='date'/>
          <input type='text' onChange={this.handleChange} value={this.state.trip.equipment} name='equipment' placeholder='equipment'/>
          <input type='submit' onClick={this.handleSubmit}/>
        </form>
      </React.Fragment>
    )
  }
}

export default withRouter(TripNew)
