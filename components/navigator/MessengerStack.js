import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import MessengerTabScreen from '../../screens/home/MessengerTabScreen';
import Message from '../../screens/home/Message';
// Navigator Variable
const Stack = createNativeStackNavigator();

export default function MessengerStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Conversation' component={MessengerTabScreen} />
            <Stack.Screen name='Message' component={Message}/>
        </Stack.Navigator>
    )
}