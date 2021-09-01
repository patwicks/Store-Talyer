import React from 'react'
import { 
    Text, 
    View,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native'
import SplashStyle from '../components/styles/style.splash'

export default function SplashScreen({navigation}) {
    return (
        <ImageBackground style = {SplashStyle.container} source={require('../assets/images/map.png')}>
        <View style = { SplashStyle.logoContainer }>
            <Image style = {SplashStyle.logo} source={require('../assets/images/find-logo.png')}/>
            <Text style = { SplashStyle.headText}>Find-Talyer App</Text>
            <Text style = {SplashStyle.subText}>Find Auto repair shops and services during emergency vehicle breakdown</Text>
        </View>
        <TouchableOpacity style = {SplashStyle.btnStartSignin} onPress={() => navigation.push('LoginScreen')}>
            <Text style = { SplashStyle.textStartSignin}>Signin</Text>
        </TouchableOpacity>
        </ImageBackground>
    )
}
