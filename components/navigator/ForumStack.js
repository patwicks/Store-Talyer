import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import ForumTabScreen from "../../screens/home/ForumTabScreen";
import CreatePostScreen from "../../screens/home/CreatePostScreen";
// Navigator Variable
const Stack = createNativeStackNavigator();

export default function ForumStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        headerShadowVisible: false,
        headerTintColor: "#111",
        headerBackVisible: false,
        keyboardHidesTabBar: true,
      }}
    >
      <Stack.Screen name="Forum" component={ForumTabScreen} />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          headerTransparent: false,
          headerTitle: "Create Post",
          headerShadowVisible: true,
          headerTintColor: "#111",
          headerBackVisible: true,
        }}
      />
    </Stack.Navigator>
  );
}
