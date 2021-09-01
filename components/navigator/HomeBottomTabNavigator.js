import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Home Bottom Tab Screens

import HomeTabScreen from '../../screens/home/HomeTabScreen';
import ProfileTabScreen from '../../screens/home/ProfileTabScreen';
import ForumTabScreen from '../../screens/home/ForumTabScreen';
import RecordTabScreen from '../../screens/home/RecordTabScreen';

// color config source
import Color from '../config/Color';

// icons
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Tab navigator varibale
const BottomTabs = createBottomTabNavigator();

// Bottom tab navigation for homeScreen
const HomeBottomTabNavigator = () => {
    return(
     <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.primary
      }}
     >
         <BottomTabs.Screen 
           name='PROFILE' 
           component={ProfileTabScreen} 
           options={{
                 headerTitle: '',
                 headerTransparent: true,
                 headerStyle: { backgroundColor: Color.primary },
                 headerTintColor: Color.white,
                 tabBarIcon: () => (<FontAwesome name="user-circle-o" size={24} color={Color.primary}/>)
             }}
         />
         <BottomTabs.Screen 
           name='HOME' 
           component={HomeTabScreen}
           options={{
             tabBarIcon: () => (<FontAwesome name="home" size={24} color={Color.primary}/>)
           }}
         />
         <BottomTabs.Screen 
           name='FORUM'
           component={ForumTabScreen} 
           options={{
           tabBarIcon: () => (
            <MaterialIcons name="forum" size={24} color={Color.primary} />)
         }}
         />
         <BottomTabs.Screen name='RECORD ' component={RecordTabScreen} 
            options={{
             tabBarIcon: () => (<FontAwesome name="history" size={24} color={Color.primary}/>)
           }}
         />
     </BottomTabs.Navigator>
    )
   }

   export default HomeBottomTabNavigator;