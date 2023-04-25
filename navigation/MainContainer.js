import React from 'react';
import { View, Text} from 'react-native';
//import Navigation dependencies
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'


//Screens
import LogScreen from './screens/LogScreen';
import FindScreen from './screens/FindScreen';

const logName = 'Log';
const findName = 'Find';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
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
                <Tab.Screen name = {logName} component = {LogScreen}/>
                <Tab.Screen name = {findName} component={FindScreen}/>

            </Tab.Navigator>

        </NavigationContainer>
      );
}
