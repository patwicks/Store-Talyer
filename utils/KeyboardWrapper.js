import React from 'react'
import { KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native'

export default KeyboardWrapper = ({children}) => {
   return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
   )
}