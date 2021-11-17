import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";

import API from "../api/api";
import Color from "../components/config/Color";
export default function PermitScreen({ route, navigation }) {
  const { storeData, services } = route.params;
  const [permitImages, setPermitImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  // handle submit data
  const submitStoreData = async () => {
    const formData = new FormData();
    const {
      firstname,
      lastname,
      middlename,
      gender,
      age,
      storeName,
      storeAddress,
      email,
      password,
      contactNo,
      profileURL,
      coverPhotoURL,
      latitude,
      longitude,
      rating,
      fullyVerified,
      isValidated,
    } = storeData;

    try {
      permitImages.forEach((item) => {
        formData.append("image", {
          // temporary data, it will change it backend
          name: new Date() + "_img",
          uri: item,
          type: "image/png",
        });
      });
      services.forEach((item) => {
        formData.append("services[]", item);
      });

      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("middlename", middlename);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("storeName", storeName);
      formData.append("storeAddress", storeAddress);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("contactNo", contactNo);
      formData.append("isValidated", isValidated);
      formData.append("profileURL", profileURL);
      formData.append("coverPhotoURL", coverPhotoURL);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("rating", rating);
      formData.append("fullyVerified", fullyVerified);

      const res = await API.post("/api/store/register", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      if (res !== null) {
        const { email, _id } = res.data;
        navigation.navigate("OtpScreen", {
          user_email: email,
          user_id: _id,
        });
      }
      setIsLoading(false);
    } catch (err) {
      setServerError(err.response.data.error);
      setIsLoading(false);
      console.log(err.response);
    }
  };

  const perimitImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });

      if (!result.cancelled) {
        setPermitImages([result.uri, ...permitImages]);
      }
    }
  };
  return (
    <View style={styles.container}>
      {serverError ? (
        <Text style={styles.serverError}>{serverError}</Text>
      ) : null}
      <Text style={styles.txt}>
        SUBMIT THE FOLLOWING REQUIREMENTS FOR VERIFICATION PROCESS
      </Text>
      <Text style={styles.txt}>(Business Permit)</Text>
      <Text style={styles.txt}>(Mayors Permit)</Text>
      <Text style={styles.txt}>(Valid Id)</Text>
      <TouchableOpacity
        onPress={() => {
          setPermitImages([]);
        }}
        style={styles.reset}
      >
        <Text
          style={{
            textTransform: "uppercase",
            letterSpacing: 1,
            color: Color.white,
          }}
        >
          Reset
        </Text>
        {/* <Ionicons name="refresh" size={20} color="#fff" /> */}
      </TouchableOpacity>
      <View
        style={{
          width: "90%",
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ScrollView
          style={styles.imageArrayContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {permitImages?.map((item, index) => {
            return (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.images} />
              </View>
            );
          })}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.btnChoose}
        onPress={() => {
          perimitImagePicker();
        }}
      >
        <Text style={styles.txtBlack}>CHOOSE PHOTO</Text>
        <FontAwesome5 name="images" size={24} color="#111111" />
      </TouchableOpacity>
      {/* btn submit */}
      <TouchableOpacity
        style={styles.btnSubmit}
        disabled={permitImages.length > 0 ? false : true}
        onPress={() => {
          submitStoreData();
          setIsLoading(true);
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <Text style={styles.txtWhite}>SUBMIT</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    textAlign: "center",
    fontWeight: "700",
    color: "#111111",
    lineHeight: 25,
  },
  btnChoose: {
    width: "90%",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: Color.primary,
  },
  txtWhite: {
    color: Color.white,
    fontWeight: "700",
    textAlign: "center",
    marginRight: 15,
  },
  txtBlack: {
    color: "#111111",
    fontWeight: "700",
    textAlign: "center",
    marginRight: 15,
  },
  imageArrayContainer: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#e6e6e6",
    overflow: "scroll",
  },
  imageContainer: {
    width: 100,
    height: 100,
    overflow: "hidden",
    margin: 5,
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  images: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  reset: {
    backgroundColor: Color.primary,
    flexDirection: "row",
    padding: 2,
    borderRadius: 5,
    marginVertical: 5,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSubmit: {
    backgroundColor: Color.primary,
    width: "90%",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  serverError: {
    backgroundColor: "#ffe6e6",
    width: "90%",
    padding: 15,
    textAlign: "center",
    borderRadius: 10,
    color: "#ff4d4d",
  },
});
