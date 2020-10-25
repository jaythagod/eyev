import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '5f2d02978c49462c9ede96a736ca41f5'
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
      input:''
    }
  }

  onInputChange = (event) =>{
    console.log(event.target.value);
  }

  onButtonSubmit = () =>{
    
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("https://samples.clarifai.com/face-det.jpg");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts'];
        console.log(concepts);
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
        {/*<FacialRecognition />*/}
      </div>
    );
  } 
}

export default App;
