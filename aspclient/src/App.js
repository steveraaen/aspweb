import React, { Component, Stylesheet } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import ReactMapGL, {Marker} from 'react-map-gl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import setDay from './utils/helpers.js'


class App extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state={
      loading: true,
      viewport: {
        width: window.innerWidth * .75,
        height: window.innerHeight * .75,
        latitude: 40.7577,
        longitude: -73.9,
        zoom: 8
      }
    }
   /* this.getDaySigns = this.getDaySigns.bind(this)*/

  }
  componentWillMount() {
    this.setState({
      curDayNo: setDay()
    })


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
           this.getDaySigns(this.state.uLongitude, this.state.uLatitude, ((doc)=> {
             this.setState({
              paramSigns: doc,
              loading: false
            })
           }))
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
        day: this.state.selDay              
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
    const styles= {
      todayCol: {
        backgroundColor: 'rgba(223, 117, 63,.9)'
      },
        otherCol: 'gray'
    }
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
        mapStyle= 'mapbox://styles/mapbox/dark-v9'
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={'pk.eyJ1Ijoic3JhYWVuIiwiYSI6ImNqMmt2Y3k4djAwNGczM3IzaWU1a3E1eW8ifQ.dTGNBuW1jqOckGIAEDOUZw'}
      > 
      {mkrs}
      <div style={{marginTop: '1em', backgroundColor: 'rgba(22,56,123,1)'}}>
<Grid container spacing={24}>
        <Grid item xs={4}> 
        <div style={{fontSize: 30, textAlign: 'center', color: 'white'}}>ASParker</div>
        </Grid>
        <Grid item xs={8}>   
          <Button variant="contained" color="default" label="Default">SUN</Button>
          <Button variant="contained" color="default" label="Default">MON</Button>
          <Button variant="contained" color="primary" label="Default">TUE</Button>
          <Button variant="contained" color="default" label="Default">WED</Button>
          <Button variant="contained" color="default" label="Default">THU</Button>
          <Button variant="contained" color="default" label="Default">FRI</Button>
          <Button variant="contained" color="default" label="Default">SAT</Button>
        </Grid>
        </Grid>
      </div>
      </ReactMapGL>
        </div>
        <div>
 
      </div>
      </div>
    );
  }
}

export default App;
