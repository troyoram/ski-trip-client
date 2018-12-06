import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { Route, Link, Switch } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import TripIndex from './trips/components/TripIndex.js'
import TripNew from './trips/components/TripNew.js'
import TripShow from './trips/components/TripShow.js'
import TripEdit from './trips/components/TripEdit.js'
import TripCreate from './trips/components/TripCreate.js'
import TripUpdate from './trips/components/TripUpdate.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
        </main>

        <Switch>
          <Route exact path="/trips" render={()=>(
            <TripIndex user={user} />
          )} />
          <Route exact path="/trips/new" render={()=>(
            <TripNew user={user} />
          )}/>
          <Route exact path="/trips/:id" render={()=>(
            <TripShow user={user} />
          )} />
          <Route exact path="/trips/:id/edit" render={()=>(
            <TripEdit user={user} />
          )} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
