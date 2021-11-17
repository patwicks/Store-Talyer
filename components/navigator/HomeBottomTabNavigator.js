import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Home Bottom Tab Screens
import MessengerStack from "./MessengerStack";
import RequestStack from "./RequestStack";
import ForumStack from "./ForumStack";
import RecordTopTabs from "./RecordToptabs";
import ProfileStack from "./ProfileStack";
// color config source
import Color from "../config/Color";

// icons
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Tab navigator varibale
const BottomTabs = createBottomTabNavigator();

// Bottom tab navigation for homeScreen
const HomeBottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.primary,
        headerTitle: "",
        headerTransparent: true,
      }}
    >
      <BottomTabs.Screen
        name="HOME"
        component={RequestStack}
        options={{
          tabBarIcon: () => (
            <Ionicons name="git-pull-request" size={26} color={Color.primary} />
          ),
          tabBarLabel: "REQUEST",
        }}
      />
      <BottomTabs.Screen
        name="FORUM"
        component={ForumStack}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="group" size={22} color={Color.primary} />
          ),
          tabBarLabel: "FORUM",
        }}
      />
      <BottomTabs.Screen
        name="MESSAGE"
        component={MessengerStack}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="forum" size={24} color={Color.primary} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="RECORD"
        component={RecordTopTabs}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="history" size={24} color={Color.primary} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="PROFILE"
        component={ProfileStack}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerStyle: { backgroundColor: Color.primary },
          headerTintColor: Color.white,
          tabBarIcon: () => (
            <FontAwesome name="user-circle-o" size={24} color={Color.primary} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default HomeBottomTabNavigator;
