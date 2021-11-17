import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// local import
import API from "../../api/api";
import RequestUser from "./subcomponent/RequestUser";

// refresh wait
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function HomeTabScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [reqData, setReqData] = useState([]);
  const [storeId, setStoreId] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchRequest();
    });
    return unsubscribe;
  }, [navigation, refreshing]);

  useEffect(() => {
    getStoreId();
  }, []);

  useEffect(() => {
    if (storeId !== null) {
      fetchRequest();
    }
  }, [storeId, refreshing]);

  useEffect(() => {
    getStoreId();
  }, []);

  useEffect(() => {
    if (storeId !== null) {
      fetchRequest();
    }
  }, [storeId, refreshing]);

  const getStoreId = async () => {
    try {
      const res = await AsyncStorage.getItem("findLoginCredential");
      if (res) {
        const parsedData = JSON.parse(res);
        setStoreId(parsedData.userID);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await API.get(
        `/api/service/request/store/${storeId}`
      );
      if (res.data) {
        setReqData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 5,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {reqData?.length > 0 ? (
          <>
            {reqData
              ?.filter((m) => m.transactionStatus === "pending")
              .map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("Request", {
                        requestId: data._id,
                        requestorId: data.transactionMember[0],
                        latidute: data.driverLatitude,
                        longitude: data.driverLongitude,
                      });
                    }}
                  >
                    <RequestUser
                      reqData={reqData}
                      storeId={storeId}
                      driverId={data.transactionMember[0]}
                    />
                  </TouchableOpacity>
                );
              })}
          </>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>No request at the moment</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
