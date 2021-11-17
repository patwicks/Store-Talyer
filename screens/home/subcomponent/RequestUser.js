import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import API from "../../../api/api";
export default function RequestUser({ reqData, driverId }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getStore = async () => {
      try {
        if (driverId !== null) {
          const res = await API.get(
            `/api/driver/${driverId}`
          );
          setUser(res.data);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    getStore();
  }, [reqData, driverId]);
  return (
    <View style={styles.reqContainer}>
      <View style={styles.left}>
        <View style={styles.circleContainer}>
          <Image
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            source={{ uri: user.profileURL }}
          />
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.name}>
          {user.firstname} {user.middlename} {user.lastname}
        </Text>
        <Text style={styles.type}>{user.accountType}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reqContainer: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
    height: 80,
    backgroundColor: "#e6e6e6",
    flexDirection: "row",
  },
  left: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 2,
    borderColor: "#cccccc",
    overflow: "hidden",
  },
  right: {
    width: "80%",
    height: "100%",
  },
  name: {
    fontWeight: "700",
    fontSize: 12,
    color: "#111111",
  },  
  type: {
    fontSize: 10,
     textTransform: "capitalize",
  },
});
