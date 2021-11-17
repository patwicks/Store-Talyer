import React, { useState, useEffect } from "react";
import {
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import call from "react-native-phone-call";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const winWidth = Dimensions.get("screen").width;
const winHeight = Dimensions.get("screen").height;

import Color from "../../../components/config/Color";
import API from "../../../api/api";

export default function RequestData({
  navigation,
  requestId,
  requestorId,
  latitude,
  longitude,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imagesModal, setImagesModal] = useState([]);
  const [data, setData] = useState([]);
  const [requestorData, setRequestorData] = useState([]);
  const [contact, setContact] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [isloading2, setIsLoading2] = useState(false);

  // make a phone call
  const triggerCall = () => {
    // Check for perfect 10 digit length
    const args = {
      number: contact,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };

  //   useHooks

  useEffect(() => {
    fetchRequestData();
    fetchRequestorData();
  }, []);

  //   fuctions fetch request data
  const fetchRequestData = async () => {
    try {
      const res = await API.get(`/api/service/request/${requestId}`);
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //   fetch requesror personal data
  const fetchRequestorData = async () => {
    try {
      const res = await API.get(`/api/driver/${requestorId}`);
      if (res.data) {
        setRequestorData(res.data);
        setContact(res.data.contactNo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Accept the service
  const acceptRequest = async () => {
    try {
      if (requestId) {
        const res = await API.patch(`/api/service/cancel/${requestId}`, {
          transactionStatus: "accepted",
        });
        console.log(res.data.message);
        setIsLoading(false);
        navigation.navigate("MESSAGE");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   denied the service
  const deniedRequest = async () => {
    try {
      if (requestId) {
        const res = await API.patch(`/api/service/cancel/${requestId}`, {
          transactionStatus: "denied",
        });
        console.log(res.data.message);
        setIsLoading2(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   ask for confirmation to cancel request
  const acceptAlert = () => {
    Alert.alert(
      "Confirmation!",
      "Are you sure you want to accept the request?",
      [
        {
          text: "Cancel",
          onPress: () => setIsLoading(false),
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            acceptRequest();
          },
        },
      ]
    );
    return true;
  };

  //   ask for confirmation to cancel request
  const deniedAlert = () => {
    Alert.alert(
      "Confirmation!",
      "Are you sure you want to denied the request?",
      [
        {
          text: "Cancel",
          onPress: () => setIsLoading2(false),
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            deniedRequest();
          },
        },
      ]
    );
    return true;
  };
  return (
    <>
      <View>
        <View style={styles.topRequestor}>
          <View style={styles.topLeft}>
            <View style={styles.topCircleContainer}>
              <Image
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
                source={{ uri: requestorData.profileURL }}
              />
            </View>
          </View>
          <View style={styles.topRight}>
            <Text style={styles.topName}>
              {requestorData.firstname} {requestorData.middlename}{" "}
              {requestorData.lastname}
            </Text>
            {/* <Text style={{ fontSize: 10, color: "#404040" }}>Driver</Text> */}
            <View style={styles.btnContainerTop}>
              <TouchableOpacity
                style={styles.btnTop}
                onPress={() => {
                  navigation.navigate("Location", {
                    latitude: latitude,
                    longitude: longitude,
                  });
                }}
              >
                <Text style={styles.btnTxt}>Location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnTop}
                onPress={() => {
                  navigation.navigate("Profile", {
                    requestorId: requestorId
                  });
                }}
              >
                <Text style={styles.btnTxt}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.statementContainer}>
          <Text style={styles.headTitle}>Problem</Text>
          <Text style={styles.statementText}>{data.statementMessage}</Text>
        </View>
        <Text style={styles.headTitle}>Service (s) Requested</Text>
        {data.selectedServices?.map((item, index) => {
          return (
            <View style={styles.serviceContainer} key={index}>
              <MaterialIcons
                name="home-repair-service"
                size={18}
                color="#333"
              />
              <Text style={styles.serviceText}>{item}</Text>
            </View>
          );
        })}

        <Text style={styles.headTitle}>Attached Images</Text>
        {data.attachedImages?.map((item, index) => (
          <View style={styles.attachedImgContainer} key={index}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => {
                  setModalOpen(true);
                  setImagesModal(data.attachedImages);
                }}
              >
                <Image style={styles.attachedImage} source={{ uri: item }} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        ))}
        <Text style={styles.headTitle}>Make Phone Call</Text>
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            triggerCall();
          }}
        >
          <FontAwesome5 name="phone-square-alt" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>(+63){contact}</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: Color.secondary }]}
            onPress={() => {
              setIsLoading(true);
              acceptAlert();
            }}
          >
            {isloading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.txt}>Accept</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#ff4d4d" }]}
            onPress={() => {
              setIsLoading2(true);
              deniedAlert();
            }}
          >
            {isloading2 ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.txt}>Denied</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => setModalOpen(false)}
          >
            <MaterialCommunityIcons name="close" size={24} color="#ffffff" />
            <Text style={{ fontSize: 16, color: "#f2f2f2", marginLeft: 10 }}>
              close
            </Text>
          </TouchableOpacity>
          {/* scrollView Image list horizontal */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={{ width: winWidth, height: winHeight }}
            pagingEnabled={true}
          >
            {imagesModal?.map((item, index) => (
              <View style={styles.imageContainerModal} key={index}>
                <Image style={styles.attachedImgModal} source={{ uri: item }} />
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  headTitle: {
    color: Color.secondary,
    fontWeight: "700",
    fontSize: 11,
    marginVertical: 5,
  },
  statementContainer: {
    marginTop: 5,
  },
  statementText: {
    fontSize: 12,
    color: "#666666",
    letterSpacing: 0.3,
    textAlign: "justify",
    marginTop: 5,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceText: {
    fontSize: 12,
    letterSpacing: 0.3,
    marginLeft: 7,
    color: "#666666",
    textTransform: "capitalize",
  },
  attachedImgContainer: {
    backgroundColor: "#e6e6e6",
    height: 120,
    borderRadius: 3,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  imageContainer: {
    backgroundColor: Color.secondary,
    width: 100,
    height: 100,
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 3,
  },
  attachedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 40,
  },
  btn: {
    width: "40%",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: Color.white,
    textTransform: "uppercase",
  },
  modalContainer: {
    height: winHeight,
    width: winWidth,
    backgroundColor: "#111111",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    position: "absolute",
    left: 20,
    top: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  imageContainerModal: {
    width: winWidth,
    height: "70%",
    alignSelf: "center",
  },
  attachedImgModal: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  errorStyle: {
    textAlign: "center",
    padding: 10,
    color: "#ff8080",
    backgroundColor: "#ffe6e6",
    width: "100%",
    marginTop: 20,
  },
  msgStyle: {
    textAlign: "center",
    padding: 10,
    color: "#66b3ff",
    backgroundColor: "#cce6ff",
    width: "100%",
    marginTop: 20,
  },
  noteContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#e6e6e6",
    marginTop: 20,
  },
  noteText: {
    color: "#bfbfbf",
    textAlign: "justify",
    fontSize: 10,
    lineHeight: 18,
  },
  //   top=======================
  topRequestor: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    backgroundColor: "#e6e6e6",
    overflow: "scroll",
    flexDirection: "row",
  },
  topLeft: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  topCircleContainer: {
    overflow: "hidden",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: "#cccccc",
  },
  topRight: {
    width: "80%",
    padding: 10,
  },
  topName: {
    fontWeight: "700",
    color: "#111111",
  },
  btnContainerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 10,
    // backgroundColor: "#1d1d1d",
    height: "70%",
  },
  btnTop: {
    width: "40%",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
    borderRadius: 5,
  },
  btnTxt: {
    color: "#ffffff",
    fontSize: 10,
  },
});
