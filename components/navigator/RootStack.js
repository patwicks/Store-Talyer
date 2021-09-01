import React, {useState, useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import SplashScreen from '../../screens/SplashScreen';
import LoginScreen from '../../screens/LoginScreen';
import TermsAndConditionsScreen from '../../screens/TermsAndConditionsScreen'
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import OtpScreen from '../../screens/OtpScreen';
import RegisterStoreScreen from '../../screens/RegisterStoreScreen';

// from navigator folder imports
import HomeBottomTabNavigator from './HomeBottomTabNavigator';

// config
import Color from '../config/Color';

// Navigator Variable
const Stack = createNativeStackNavigator();



export default function RootStack() {
    const [isLogin, setIsLogin] = useState(false);

    const getData = async () => {
        try {
          const data = await AsyncStorage.getItem('findLoginCredential');
          const parsedData = JSON.parse(data);
            if(parsedData !== null) {
                setIsLogin(true);
            }
            else {
                setIsLogin(false)
            }
        } catch(e) {
          console.log(e)
        }
      }

      useEffect(()=> {
          let unmounted = false;
        if(!unmounted) {
           getData(); 
        }
        return(() => {
            unmounted = true;
        });
      },[])
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions = {{
                    headerTransparent: true,
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerTintColor: Color.primary,
                }}
            >
                {isLogin ? <Stack.Screen name='HomeScreen' component={HomeBottomTabNavigator} options={{headerBackVisible: false}} /> : 
                 <>
                    <Stack.Screen name='SplashScreen' component={SplashScreen} />
                    <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerBackVisible: false}} />
                    <Stack.Screen name='RegisterScreen' component={RegisterStoreScreen}
                        options={{
                            headerTitle: 'Signup',
                            headerTransparent: false,
                            headerStyle: {
                                backgroundColor: Color.primary
                            },
                            headerTintColor: Color.white,
                    }}
                    />
                    <Stack.Screen name='OtpScreen' component={OtpScreen} options={{headerBackVisible: false}} />
                    <Stack.Screen name='TermsAndConditionsScreen' component={TermsAndConditionsScreen}/>
                    <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
                    <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
                    <Stack.Screen name='HomeScreen' component={HomeBottomTabNavigator} options={{headerBackVisible: false}} />
                 </>
                } 
            </Stack.Navigator>  
        </NavigationContainer>
       
    )
}
