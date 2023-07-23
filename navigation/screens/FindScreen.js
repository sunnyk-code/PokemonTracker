import React, {Component} from 'react';
import { View, Image, StyleSheet, StatusBar, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps';


class FindScreen extends Component {

   constructor(props) {
       super(props);
       this.state = {
           region: null,
           markers: [],
           selectedMarker: null,
       }; 
   }

    handleMarkerPress = (marker) => {
        this.setState({ selectedMarker: marker });
    };




    render() {
       const { markers, currentLocation } = this.props;
       const { region, selectedMarker } = this.state;
       return (
           <View style={styles.container}>
                <MapView
                   style={styles.map}
                   region={region}
                   initialRegion={currentLocation}
                   onRegionChangeComplete={newRegion => this.setState({ region: newRegion })}
                   showsUserLocation={true}>
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            onPress={() => this.handleMarkerPress(marker)}
                        >
                            <Image
                                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${marker.id}.png` }}
                                style={{ width: 100, height: 100}} 
                            />
                        </Marker>
                    ))}
                    
                </MapView>
                {selectedMarker && (
                        <View style={styles.markerInfoContainer}>
                            <Text style={styles.markerInfoText}>
                                <Text style={styles.boldText}>Description:</Text>
                                {selectedMarker.description}
                            </Text>
                        </View>
                    )}
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
markerInfoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  markerInfoText: {
    textAlign: 'center', 
  },
  boldText: {
    fontWeight: 'bold', // Make the text bold
  },
});


export default FindScreen;