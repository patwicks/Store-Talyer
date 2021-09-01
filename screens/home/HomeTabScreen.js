import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'

export default function HomeTabScreen() {
    return (
        <View style={{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30
            }}>
            <Text>This is Main Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
