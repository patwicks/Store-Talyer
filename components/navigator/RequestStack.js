import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeTabScreen from "../../screens/home/HomeTabScreen";
import CheckRequest from "../../screens/home/CheckRequest";
import RequestorLocation from "../../screens/home/RequestorLocation";
import VisitUserProfile from "../../screens/home/VisitUserProfile";
// Navigator Variable
const Stack = createNativeStackNavigator();

export default function RequestStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Request List" component={HomeTabScreen} />
      <Stack.Screen name="Request" component={CheckRequest} />
      <Stack.Screen name="Location" component={RequestorLocation} />
      <Stack.Screen name="Profile" component={VisitUserProfile} />
    </Stack.Navigator>
  );
}
