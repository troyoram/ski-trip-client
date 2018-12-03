import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'

class TripIndex extends React.Component {

  constructor (props) {
    super(props)
    this.state = {trips: []}
    // console.log('this is TripIndex constructor')
    // console.log('this is apiUrl ' + apiUrl)
  }

  async componentDidMount(){
    // console.log('this is componentDidMount')
    // const response = await axios.get('http://localhost:4741/trips')
    const response = await axios.get(`${apiUrl}/trips`)
    this.setState({trips: response.data.trips})
  }

  async handleDelete (event, id) {
    event.preventDefault()
    console.log('this is handleDelete(id) ' + id)
    const user = this.props.user

    // const response = await axios.delete(`${apiUrl}/trips/${id}`)

    const response = await axios({
      method: 'delete',
      url: `${apiUrl}/trips/${id}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })

    console.log('this is handleDelete response ' + response)
    const updatedTripList = this.state.trips.filter(trip => trip.id !== id)
    this.setState({trips: updatedTripList})
  }

  render() {
    // console.log('this is TripIndex render')
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
            <Link to={`/trips/${id}/update`}>Update</Link>
          </td>
          <td>
            <button onClick={(event) => {
              return this.handleDelete(event, id)
            }}>Delete</button>
          </td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <h1>Trip Index</h1>
        <Link to="/trips/new">Add a Trip</Link>
        <Link to="/trips/create">Create a Trip</Link>
        <table>
          <tbody>
            {tripRows}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(TripIndex)
