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
    // const name = event.target.name
    // const value = event.target.value
    // // make copy of trip object
    // const updateTrip = Object.assign(this.state.trip)
    // updateTrip[name]=value

    // ES6 below replaces the above code
    const updateTrip = { ...this.state.trip, [event.target.name]: event.target.value }

    this.setState({
      trip: updateTrip
    })
  }

  // handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const trip = this.state.trip
  //   const id = this.props.match.params.id
  //   const response = await axios.patch(`${apiUrl}/trips/${id}`, {
  //     trip: trip
  //   })
  //
  //   this.props.history.push('/trips')
  //   console.log(response)
  // }

  handleSubmit = async (event) => {
    event.preventDefault()
    const user = this.props.user
    // console.log(user)
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
    const id = this.props.match.params.id
    const response = await axios.get(`${apiUrl}/trips/${id}`)
    console.log(response)
    const trip = response.data.trip
    this.setState({
      trip: trip
    })
  }

  render() {

    return (
      <React.Fragment>
        <h1>Trip Update</h1>
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
