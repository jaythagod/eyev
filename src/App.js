import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FacialRecognition from './components/FacialRecognition/FacialRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

const app = new Clarifai.App({
  apiKey: '92bf6f3dfac149d3b6e1347ed632acd7'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component{
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn: false,
      user:{
            'id': '',
            'name': '',
            'email': '',
            'entries': 0,
            'joined': ''
      }
    }
  }

  loadUser =(data)=>{
    this.setState({user: {
      'id': data.id,
      'name': data.name,
      'email': data.email,
      'entries': data.entries,
      'joined': data.joined
    }});
  }


  calculateFaceLocation = (data) =>{

     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage');
     const width = Number(image.width);
     const height = Number(image.height);
     
     return{
       leftCol: clarifaiFace.left_col * width,
       topRow: clarifaiFace.top_row * height,
       rightCol: width - (clarifaiFace.right_col * width),
       bottomRow: height - (clarifaiFace.bottom_row * height)
     };
  }

  displayFaceBox = (box) =>{
    
    this.setState({box: box});

  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{

    this.setState({imageUrl: this.state.input});
    
    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => {
        
        return generalModel.predict(this.state.input);
      })
      .then(response => {

        this.displayFaceBox(this.calculateFaceLocation(response));
      
      }).catch(err=> console.log(err));
  }

  onRouteChange = (route)=>{
    if(route === 'home'){
      this.setState({isSignedIn: true});
    }else{
      this.setState({isSignedIn: false});
    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FacialRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>

          : (this.state.route === 'signin' 
              ? <SignIn onRouteChange={this.onRouteChange} /> 
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
            
        }
      </div>
    );
  } 
}

export default App;
