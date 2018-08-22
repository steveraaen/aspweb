import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import ReactMapGL, {Marker} from 'react-map-gl';
class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      loading: true,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 40.7577,
        longitude: -73.9,
        zoom: 14
      }
    }
    this.getDaySigns = this.getDaySigns.bind(this)
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(function(pos) {
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          uLatitude: position.coords.latitude,
          uLongitude: position.coords.longitude, 
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 11
          },        
         error: null,
        }, () => {
           this.getDaySigns(this.state.uLongitude, this.state.uLatitude)
        });
       
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true,  distanceFilter: 50, timeout: 10 },
            )      
        }.bind(this)) 
  }

  getDaySigns(ln, la) {
   axios.get('/mon', {
      params: {
        coordinates: [ln, la],
        /*day: this.state.selDay */             
      }
    }) 
  .then((doc) => {
    this.setState({
      paramSigns: doc,
      loading: false
    })
  })
  }

  render() {
    console.log(this.state.paramSigns)
    if(this.state.paramSigns) {
    var mkrs = this.state.paramSigns.data.map((si, index) => {
      var la = si.geometry.coordinates[1]
      var ln = si.geometry.coordinates[0]
    
    return(
        <Marker key={index} latitude={la} longitude={ln} offsetLeft={-20} offsetTop={-10}>
          <div style={{height: '2px', width: '2px', backgroundColor: 'red'}}></div>
        </Marker>
      )
    })
  } 
    return (
      <div style={{justifyContent: 'center'}}>
        <header className="App-header">
   
          <h1 className="App-title">ASParker</h1>
        </header>
        <div>
        <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={'pk.eyJ1Ijoic3JhYWVuIiwiYSI6ImNqMmt2Y3k4djAwNGczM3IzaWU1a3E1eW8ifQ.dTGNBuW1jqOckGIAEDOUZw'}
      > 
      {mkrs}
      </ReactMapGL>

        </div>
      </div>
    );
  }
}

export default App;
