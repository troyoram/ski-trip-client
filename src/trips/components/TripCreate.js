import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'

class TripCreate extends React.Component {

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
    // const name = event.target.name
    // const value = event.target.value
    // // make copy of trip object
    // const createTrip = Object.assign(this.state.trip)
    // createTrip[name]=value

    // ES6 below replaces the above code
    const createTrip = { ...this.state.trip, [event.target.name]: event.target.value }

    this.setState({
      trip: createTrip
    })
  }

  // handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const trip = this.state.trip
  //   const response = await axios.post(`${apiUrl}/trips`, {
  //     trip: trip
  //   })
  //
  //   this.props.history.push('/trips')
  // }

  handleSubmit = async (event) => {
    event.preventDefault()
    const user = this.props.user
    // console.log(user)
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
        <h1>Trip Create</h1>
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

export default withRouter(TripCreate)
