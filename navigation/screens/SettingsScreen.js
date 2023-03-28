import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native'

export default function SettingsScreen({navigation}) {
    return (
        <View style={styles.container}>
        <Text
            style = {{fontSize: 26, fontWeight: 'bold'}}>Settings SCREEN
        </Text>
        <StatusBar style="auto" />
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    }
})

