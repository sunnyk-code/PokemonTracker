import React, {Component} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


class FindScreen extends Component {
   constructor(props) {
       super(props);
       this.state = {
           region: {
               latitude: 0,
               longitude: 0,
               latitudeDelta: 0.003,
               longitudeDelta: 0.003
           },
           myLocation: null,
           markers: []
       };
      
       Location.installWebGeolocationPolyfill()
       navigator.geolocation.getCurrentPosition(
           position => {
               this.setState({
                   myLocation: {
                       latitude: position.coords.latitude,
                       longitude: position.coords.longitude,
                       latitudeDelta: 0.003,
                       longitudeDelta: 0.003
                   }
               });
           }
       );
   }
    
    componentDidMount() {
        console.log("MOUNTED");
    }
    
    createMarker(name, description) {
        // const randLatitude = this.state.myLocation.latitude + (Math.random() - 0.5) * (0.003 / 2);
        // const randLongitude = this.state.myLocation.longitude + (Math.random() - 0.5) * (0.003 / 2);

        //Change temporarily to get backend working
        const randLatitude = (Math.random() - 0.5) * (0.003 / 2);
        const randLongitude = (Math.random() - 0.5) * (0.003 / 2);

        const newCoordinate = {
            latitude: randLatitude,
            longitude: randLongitude,
        };

        const newMarker = {
            coordinate: newCoordinate,
            title: name,
            description: description
        };

        //Add put api call here
        this.state.markers.push(newMarker);
        console.log(this.state.markers);
    }

    render() {
       return (
           <View style={styles.container}>
               {!this.state.myLocation && (<MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChangeComplete={region => this.setState({ region: region })}>
               </MapView>)}
               
               {this.state.myLocation && (<MapView
                   style={styles.map}
                   region={this.state.myLocation}
                   onRegionChangeComplete={region => this.setState({ myLocation: region })}
                   showsUserLocation={true}>
                    </MapView>)}
           </View>
       );
   }
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
map: {
  width: '100%',
  height: '100%',
},
});


export default FindScreen;