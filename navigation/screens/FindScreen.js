import React, {Component} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import MapView from 'react-native-maps';
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
           }
       };
      
       Location.installWebGeolocationPolyfill()
       navigator.geolocation.getCurrentPosition(
           position => {
               this.setState({
                   region: {
                       latitude: position.coords.latitude,
                       longitude: position.coords.longitude,
                       latitudeDelta: 0.003,
                       longitudeDelta: 0.003
                   }
               });
           }
       );
   }


   addPokemon


   render() {
       return (
           <View style={styles.container}>
               <MapView
                   style={styles.map}
                   region={this.state.region}
                   onRegionChangeComplete={region => this.setState({ region })}
                   showsUserLocation={true}
               />
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