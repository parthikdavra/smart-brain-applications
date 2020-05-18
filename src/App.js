import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './components/Particle.css';

import SignIn from "./components/SignIn/SignIn";
import 'tachyons';



const partileOption = {
  "particles": {
    "number": {
      "value": 230
    },
    "polygon": {
      "enable": true,
      "type": 'inside',
      "move": {
        "radius": 10
      }
    },
    "size": {
      "value": 0
    }
  },
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputimage = document.getElementById('inputimage');
    const width = Number(inputimage.width);
    const height = Number(inputimage.height);
    return {
      leftCol: clarifiFace.left_col * width,
      topRow: clarifiFace.top_row * height,
      rightCol: width - (clarifiFace.right_col * width),
      bottomRow: height - (clarifiFace.bottom_row * height)
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('https://limitless-spire-56667.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      }) 
    })  
        .then((response) => response.json())
        .then(response => {
          if (response) {
            fetch('https://limitless-spire-56667.herokuapp.com/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then((response) => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }))
              })
              .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err))
  }
  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles params={partileOption} className='particles' />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :
          (route === 'home'
            ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }

      </div>
    );
  }
}

export default App;
