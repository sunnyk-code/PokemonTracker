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
    
    


    render() {
       return (
        //    <View style={styles.container}>
        //        {!this.state.myLocation && (<MapView
        //             style={styles.map}
        //             region={this.state.region}
        //             onRegionChangeComplete={region => this.setState({ region: region })}>
        //        </MapView>)}
               
        //        {this.state.myLocation && (<MapView
        //            style={styles.map}
        //            region={this.state.myLocation}
        //            onRegionChangeComplete={region => this.setState({ myLocation: region })}
        //            showsUserLocation={true}>
        //             </MapView>)}
        //    </View>
        <View>
      {this.props.markers.map((marker) => (
        <View key={marker._id} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
          <Text>Name: {marker.name}</Text>
          <Text>Description: {marker.description}</Text>
          <Text>Latitude: {marker.latitude}</Text>
          <Text>Longitude: {marker.longitude}</Text>
          <Text>Timestamp: {marker.timestamp}</Text>
        </View>
      ))}
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