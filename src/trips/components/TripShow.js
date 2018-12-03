import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'

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
    const id = this.props.match.params.id
    const response = await axios.get(`${apiUrl}/trips/${id}`)
    console.log(response)
    const trip = response.data.trip
    this.setState({
      trip: trip
    })
  }

  // async componentDidMount(event){
  //   // event.preventDefault()
  //   const user = this.props.user
  //   // console.log(user)
  //   const trip = this.state.trip
  //   const id = this.props.match.params.id
  //   const response = await axios({
  //     method: 'get',
  //     url: `${apiUrl}/trips/${id}`,
  //     headers: {
  //       'Authorization': `Token token=${user.token}`
  //     },
  //     data: {
  //       trip: trip
  //     }
  //   })
  //
  //   this.props.history.push('/trips')
  // }

  render() {
    return (
      <React.Fragment>
        <h1>Trip:</h1>
        <p>{this.state.trip.location}</p>
        <p>{this.state.trip.date}</p>
        <p>{this.state.trip.equipment}</p>
      </React.Fragment>
    )
  }
}

export default withRouter(TripShow)
