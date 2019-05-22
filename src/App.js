import React from 'react';
import { Upload } from './Upload.js'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Results } from './Results';
import { SingleImage } from './SingleImage';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user: ""}

    this.setUser = this.setUser.bind(this)
  }

  setUser(user) {
    this.setState({user: user})
  }

  render() {
    return <Router>
      <Navbar user={this.state.user}/>
      <div>
        <Route exact path="/" component={SearchBar} />
        <Route path="/search/:searchTerm?" component={Results} />
        <Route path="/images/:id" component={SingleImage} />
        <Route path="/upload" render={(props) => <Upload {...props} user={this.state.user} />}/>
        <Route path="/login" render={(props) => <Login {...props} setUser={this.setUser}/>} />
        <Route path="/logout" render={(props) => <Logout {...props} setUser={this.setUser}/>} />
      </div>
      <Activities />
    </Router>
  }
}

const Logout = ({setUser}) => {
  setUser("")
  return <Redirect to="/"/>
}


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user: "", password: "", submitted: false}
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  
  onChange(event) {
    if (event.target.id === "user")
      this.setState({user: event.target.value})
    if (event.target.id === "password")
    this.setState({password: event.target.value})
  }

  handleSubmit(event) {
    this.setState({submitted: true})
    this.props.setUser(this.state.user)
    event.preventDefault();
  }

  render() {
    if (this.state.submitted) return <Redirect push to="/" />

    return <Container>
      <h2>Logga in</h2>
      <Form onSubmit={this.handleSubmit}>
    <FormGroup>
      <Label for="user">Användarnamn</Label>
      <Input type="text" name="user" id="user" onChange={this.onChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="password">Lösenord</Label>
      <Input type="password" name="password" id="password" onChange={this.onChange}/>
    </FormGroup>
    <Button color="success">Skicka</Button>
  </Form>
  </Container>
  }
}

/**
 * Länkar högst upp 
 */ 
const Navbar = ({user}) => {
  return <nav className="navbar navbar-light bg-light static-top">
      <p className="navbar-brand"><Link to="/">Bothniabladet</Link></p>

      {user !== "" ? <p>Inloggad som {user}</p> : <p></p>}
      {user !== "" ? 
      <Link to="/logout" className="btn btn-primary">Logga ut</Link> : 
      <Link to="/login" className="btn btn-primary">Logga in</Link>}
        
  </nav>
}

/**
 * Länkar till aktiviteter
 */
const Activities = () =>
  <div className="container">
    <h1 className="my-4">Andra aktiviteter</h1>
    <div className="row">
      <div className="col mb-4">
        <div className="card h-100">
          <h4 className="card-header">Ladda upp bilder</h4>
          <div className="card-body">
            <p className="card-text">Ladda upp bilder till bilddatabasen.</p>
          </div>
          <div className="card-footer">
            <Link to="/upload" className="btn btn-primary">Gå till bilduppladdning</Link>
          </div>
        </div>
      </div>
      <div className="col mb-4">
        <div className="card h-100">
          <h4 className="card-header">Lämna tips</h4>
          <div className="card-body">
            <p className="card-text">Har du en bild från en aktuell händelse, gör tidningen bättre genom att skicka in bilden!</p>
          </div>
          <div className="card-footer">
            <Link to="/upload" className="btn btn-primary">Lämna tips</Link>
          </div>
        </div>
      </div>
    </div>
  </div>

/**
 * Sökfält på förstasidan
 */
class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerm: '',
      searchClicked: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState(
      {
        searchTerm: this.state.searchTerm.replace(" ", ","),
        searchClicked: true
      })
  }

  render() {
    return this.state.searchClicked ? <Redirect push to={"search/" + this.state.searchTerm} /> :
      <header className="masthead text-white text-center">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <h1 className="mb-5">Sök efter bilder i vår bilddatabas</h1>
            </div>
            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="col-12 col-md-9 mb-2 mb-md-0">
                    <input className="form-control form-control-lg" placeholder="Sökord ..." onChange={this.handleChange} />
                  </div>
                  <div className="col-12 col-md-3">
                    <button type="submit" className="btn btn-block btn-lg btn-primary">Sök</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
  }
}

export default App;
