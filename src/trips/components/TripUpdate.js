import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'

class TripUpdate extends React.Component {

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
    const updateTrip = { ...this.state.trip, [event.target.name]: event.target.value }
    this.setState({
      trip: updateTrip
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const user = this.props.user
    const trip = this.state.trip
    const id = this.props.match.params.id
    const response = await axios({
      method: 'patch',
      url: `${apiUrl}/trips/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        trip: trip
      }
    })
    this.props.history.push('/trips')
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

  render() {
    return (
      <React.Fragment>
        <h2>Trip Update:</h2>
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

export default withRouter(TripUpdate)
