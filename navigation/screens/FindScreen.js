import React, {Component} from 'react';
import { View, Image, StyleSheet, StatusBar, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps';


class FindScreen extends Component {
   constructor(props) {
       super(props);
       this.state = {
           region: null,
           markers: [],
           myLocation: null
       };
      
       
   }



    render() {
       const { markers, currentLocation } = this.props;
       return (
           <View style={styles.container}>
                <MapView
                   style={styles.map}
                   region={this.state.region}
                   initialRegion={currentLocation}
                   onRegionChangeComplete={newRegion => this.setState({ region: newRegion })}
                   showsUserLocation={true}>
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            image={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${marker.id}.png` }}
                        />
                    ))}
                </MapView>
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