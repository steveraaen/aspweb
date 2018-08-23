import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import axios from 'axios'
import ReactMapGL, {Marker} from 'react-map-gl';
import RaisedButton from 'material-ui/RaisedButton';
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
        zoom: 8
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
            zoom: 14
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
  componentDidMount() {
   
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
          <div style={{height: 4, width: 4, borderRadius: 2, backgroundColor: 'red'}}></div>
        </Marker>
      )
    })
  } 
    return (
      <div style={{justifyContent: 'center'}}>
        <div>
        <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={'pk.eyJ1Ijoic3JhYWVuIiwiYSI6ImNqMmt2Y3k4djAwNGczM3IzaWU1a3E1eW8ifQ.dTGNBuW1jqOckGIAEDOUZw'}
      > 
      {mkrs}
      <div style={{flex: .14, flexDirection: 'row', flexWrap: 'wrap', marginTop: '8em', backgroundColor: 'coral'}}>
        <div style={{fontSize: 30, textAlign: 'center', color: 'white'}}>
      <MuiThemeProvider>
      <RaisedButton label="Default" />
      <RaisedButton label="Default" />
      <RaisedButton label="Default" />
      <RaisedButton label="Default" />
      <RaisedButton label="Default" />
      </MuiThemeProvider>
        </div>
        <div style={{fontSize: 30, textAlign: 'center', color: 'white'}}>helo</div>
      </div>
      </ReactMapGL>

        </div>
      </div>
    );
  }
}

export default App;
