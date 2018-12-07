import React from 'react'
import { Table, Grid, Row, Col } from 'react-bootstrap'
import './weather.scss'

class Weather extends React.Component {
  render() {
    return (
      <React.Fragment>
        <br/>
        <Grid>
          <Row className="show-grid">
            {this.props.city && this.props.country &&
              <Col className="box" xs={12} md={3}>{'Location'}</Col>}
            {this.props.temperature &&
              <Col  className="box" xs={12} md={3}>{'Temperature (F)'}</Col>}
            {this.props.humidity &&
              <Col  className="box" xs={12} md={3}>{'Humidity (%)'}</Col>}
            {this.props.description &&
              <Col  className="box" xs={12} md={3}>{'Conditions'}</Col>}
            {this.props.error &&
              <Col  className="box" xs={12} md={3}>{'Error'}</Col>}
          </Row>
          <Row className="show-grid">
            {this.props.city && this.props.country &&
              <Col  className="box" xs={12} md={3}>{this.props.city}</Col>}
            {this.props.temperature &&
              <Col  className="box" xs={12} md={3}>{this.props.temperature}</Col>}
            {this.props.humidity &&
              <Col  className="box" xs={12} md={3}>{this.props.humidity}</Col>}
            {this.props.description &&
              <Col  className="box" xs={12} md={3}>{this.props.description}</Col>}
            {this.props.error &&
              <Col  className="box" xs={12} md={3}>{this.props.error}</Col>}
          </Row>
        </Grid>
      </React.Fragment>
    )
  }
}

export default Weather
