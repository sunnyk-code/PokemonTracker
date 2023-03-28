import React from 'react';
import { View, Text} from 'react-native';
//import Navigation dependencies
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'


//Screens
import HomeScreen from './screens/HomeScreen';
import LogScreen from './screens/LogScreen';
import FindScreen from './screens/FindScreen';
import SettingsScreen from './screens/SettingsScreen';

const homeName = 'Home';
const logName = 'Log';
const findName = 'Find';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer> 
            <Tab.Navigator
                initalRouteName = {homeName}
                screenOptions = {({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let routeName = route.name;

                        if (routeName == homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (routeName == logName) {
                            iconName = focused ? 'add' : 'add-outline'
                        } else if (routeName == findName) {
                            iconName = focused ? 'map' : 'map-outline'
                        } else if (routeName == settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        }
                        return <Ionicons name = {iconName} size = {size} color = {color} />
                    },
                })}>
                <Tab.Screen name = {homeName} component={HomeScreen}/>
                <Tab.Screen name = {logName} component = {LogScreen}/>
                <Tab.Screen name = {findName} component={FindScreen}/>
                <Tab.Screen name = {settingsName} component={SettingsScreen}/>



            </Tab.Navigator>

        </NavigationContainer>
      );
}
