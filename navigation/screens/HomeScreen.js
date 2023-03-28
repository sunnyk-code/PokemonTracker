import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native'


export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
        <Text
            style = {{fontSize: 26, fontWeight: 'bold'}}>HOME SCREEN
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

