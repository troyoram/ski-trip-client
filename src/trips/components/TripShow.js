import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Table, Button } from 'react-bootstrap'

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

  render() {
    return (
      <React.Fragment>
        <h2>Trip:</h2>
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
      </React.Fragment>
    )
  }
}

export default withRouter(TripShow)
