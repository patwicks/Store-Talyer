import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

export default function RequestorLocation({ route, navigation }) {
  const { latitude, longitude } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        initialRegion={{
          latitude: 15.0594,
          longitude: 120.6567,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={[
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
        ]}
      >
        <Marker
          coordinate={{
            latitude: 15.0454702,
            longitude: 120.6633417,
          }}
        >
          <Callout>
            <Text>Requestor</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({});
