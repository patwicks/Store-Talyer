import React, { useState, useEffect, useCallback } from "react";
import { View, RefreshControl, ScrollView } from "react-native";
import RequestData from "./subcomponent/RequestData";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function CheckRequest({ route, navigation }) {
  const { requestId, requestorId, latitude, longitude } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <RequestData
          requestId={requestId}
          requestorId={requestorId}
          latitude={latitude}
          longitude={longitude}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
}
