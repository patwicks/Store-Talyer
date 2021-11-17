import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import API from "../../api/api";

// icons
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function VisitUserProfile({ route }) {
  // params
  const { requestorId } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, [requestorId]);

  //   fetch user data
  const fetchUserData = async () => {
    try {
      const res = await API.get(`/api/driver/${requestorId}`);
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.topContainer}>
          <ImageBackground
            blurRadius={5}
            style={styles.ImageBackground}
            source={{ uri: data.profileURL }}
          >
            <View style={styles.circleContainer}>
              <Image
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                source={{ uri: data.profileURL }}
              />
            </View>
          </ImageBackground>
        </View>
        {/* Name */}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {data.firstname} {data.lastname}
          </Text>

          <View style={styles.verifiedContainer}>
            <MaterialIcons name="verified" size={24} color="#00cc66" />
            <Text style={{ fontSize: 10 }}>Verified</Text>
          </View>
        </View>
        {/* header Info text */}
        <View style={styles.header}>
          <Text style={{ color: "#ffffff", fontSize: 15 }}>
            Personal Information
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons
              name="face-profile"
              size={24}
              color="#111111"
            />
            <Text style={styles.infoText}>
              {data.firstname} {data.middlename} {data.lastname}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons
              name="email-check"
              size={24}
              color="#111111"
            />
            <Text style={styles.infoText}>{data.email}</Text>
          </View>
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons name="phone" size={24} color="#111111" />
            <Text style={styles.infoText}>(+63) {data.contactNo}</Text>
          </View>
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons
              name="gender-male-female"
              size={24}
              color="#111111"
            />
            <Text style={styles.infoText}>{data.gender}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#e6e6e6",
    height: 250,
    width: "100%",
  },
  ImageBackground: {
    width: "100%",
    height: "100%",
    position: "relative",
    alignItems: "center",
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 3,
    borderColor: "#0073e6",
    position: "absolute",
    bottom: 60,
    overflow: "hidden",
  },
  nameContainer: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  verifiedContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
  },
  header: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#0073e6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  detailsContainer: {
    padding: 10,
  },
  infoText: {
    padding: 5,
    fontSize: 14,
    color: "#404040",
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
