import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// screen
import AcceptedRequestScreen from "../../screens/home/AcceptedRequestScreen";
import DeniedRequestScreen from "../../screens/home/DeniedRequestScreen";
import FinishedRequestScreen from "../../screens/home/FinishedRequestScreen";

const Tab = createMaterialTopTabNavigator();

export default function RecordTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: "#e6e6e6",
          height: 80,
          padding: 20
        },
      }}
    >
      <Tab.Screen name="Accepted" component={AcceptedRequestScreen} />
      <Tab.Screen name="Denied" component={DeniedRequestScreen} />
      <Tab.Screen name="Finished" component={FinishedRequestScreen} />
    </Tab.Navigator>
  );
}
