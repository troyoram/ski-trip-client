import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Table, Button } from 'react-bootstrap'

class TripIndex extends React.Component {

  constructor (props) {
    super(props)
    this.state = {trips: []}
  }

  async componentDidMount(event){
    const user = this.props.user
    const response = await axios({
      method: 'get',
      url: `${apiUrl}/trips/`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
    this.setState({trips: response.data.trips})
  }

  async handleDelete (event, id) {
    event.preventDefault()
    const user = this.props.user
    const response = await axios({
      method: 'delete',
      url: `${apiUrl}/trips/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
    const updatedTripList = this.state.trips.filter(trip => trip.id !== id)
    this.setState({trips: updatedTripList})
  }

  render() {
    const tripRows = this.state.trips.map(trip => {
      const {id, location, date, equipment} = trip

      return (
        <tr key={id}>
          <td>
            <Link to={`/trips/${id}`}>{id}</Link>
          </td>
          <td>{location}</td>
          <td>{date}</td>
          <td>{equipment}</td>
          <td>
            <Link to={`/trips/${id}/edit`}>Edit</Link>
          </td>
          <td>
            <Button bsStyle="warning" onClick={(event) => {
              return this.handleDelete(event, id)
            }}>Delete</Button>
          </td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <h2>Trip Index:</h2>
        <Link to="/trips/new">Add a Trip</Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Location</th>
              <th>Date</th>
              <th>Equipment</th>
            </tr>
          </thead>
          <tbody>
            {tripRows}
          </tbody>
        </Table>
      </React.Fragment>
    )
  }
}

export default withRouter(TripIndex)
