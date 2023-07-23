import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
//import Navigation dependencies
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import * as Location from 'expo-location';


//Screens
import LogScreen from './screens/LogScreen';
import FindScreen from './screens/FindScreen';

const logName = 'Log';
const findName = 'Find';

const Tab = createBottomTabNavigator();

export default function MainContainer() {

    const serverURL = 'http://10.0.0.91:5050';

    const [markers, setMarkers] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    // useEffect hook to update markers when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            await updateMarkers();
            await getCurrentLocation();
        };
        fetchData();
        // Poll for updated markers every 10 minutes
        const interval = setInterval(updateMarkers, 10 * 60 * 1000);
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);

    }, []);

    // Function to fetch markers from the server
    const updateMarkers = async () => {
        try {
            const response = await axios.get(serverURL + '/api')
            setMarkers(response.data)
        } catch (error) {
            console.error('Error fetching markers:', error);
        }
    };

      //Adds a new marker 
    const addMarker = async (marker) => {
        try {
            const response = await axios.post(serverURL + '/api', marker)
        } catch (error) {
            console.error('Error adding marker:', error);
        }
        updateMarkers();
    };

    const getCurrentLocation = async () => {
        try {
          await new Promise((resolve, reject) => {
            Location.installWebGeolocationPolyfill();
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setCurrentLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003,
                });
                resolve();
              },
              (error) => {
                // Handle any error that occurs during geolocation retrieval
                console.error('Error getting current location:', error);
                reject(error);
              }
            );
          });
        } catch (error) {
          // Handle any error that occurred during the Promise
          console.error('Promise error:', error);
        }
      };


    

    return (
        <NavigationContainer> 
            <Tab.Navigator
                initalRouteName = {logName}
                screenOptions = {({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let routeName = route.name;

                        if (routeName == logName) {
                            iconName = focused ? 'add' : 'add-outline'
                        } else if (routeName == findName) {
                            iconName = focused ? 'map' : 'map-outline'
                        }
                        return <Ionicons name = {iconName} size = {size} color = {color} />
                    },
                })}>
                <Tab.Screen name = {findName}>
                    {props => <FindScreen markers = {markers} currentLocation = {currentLocation}  />}
                </Tab.Screen>                
                <Tab.Screen name = {logName}>
                    {props => <LogScreen updateMarkers = {updateMarkers} addMarker = {addMarker} currentLocation = {currentLocation} />}
                </Tab.Screen>


            </Tab.Navigator>

        </NavigationContainer>
      );
}
