import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FacialRecognition from './components/FacialRecognition/FacialRecognition';
import Rank from './components/Rank/Rank';
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
      imageUrl:''
    }
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{

    this.setState({imageUrl: this.state.input});
    
    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => {
        //"https://samples.clarifai.com/face-det.jpg"
        return generalModel.predict(this.state.input);
      })
      .then(response => {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      })
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FacialRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  } 
}

export default App;
