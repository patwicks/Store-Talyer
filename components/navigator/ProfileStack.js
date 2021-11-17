import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import GalleryCollectionScreen from "../../screens/home/GalleryCollectionScreen";
import PermitCollectionScreen from "../../screens/home/PermitCollectionScreen";
import ProfileTabScreen from "../../screens/home/ProfileTabScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="ProfileTab" component={ProfileTabScreen} />
      <Stack.Screen
        name="Permit"
        component={PermitCollectionScreen}
        options={{
          headerTransparent: false,
          headerTitle: "Store Permit",
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={GalleryCollectionScreen}
        options={{
          headerTransparent: false,
          headerTitle: "Store Gallery",
          headerShadowVisible: true,
        }}
      />
    </Stack.Navigator>
  );
}
