import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// local
import API from "../../api/api";

const winWidth = Dimensions.get("screen").width;
const winHeight = Dimensions.get("screen").height;

export default function GalleryCollectionScreen({ route }) {
  const { gallery } = route.params;
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const galleryImagePicker = async () => {
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
        setGalleryImages([result.uri, ...galleryImages]);
      }
    }
  };
  const uploadToGallery = async () => {
    const formData = new FormData();
    galleryImages.forEach((item) => {
      formData.append("image", {
        // temporary data, it will change it backend
        name: new Date() + "_img",
        uri: item,
        type: "image/png",
      });
    });
    try {
      const res = await API.post(
        `/api/store/upload/gallery/6194a365d9774d1264495ef6`,
        formData
      );
      if (res.data) {
        console.log(res.data);
        setGalleryImages([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <TouchableOpacity style={styles.uploadBtn} onPress={galleryImagePicker}>
          <AntDesign name="upload" size={15} color="black" />
          <Text style={{ fontSize: 12, marginLeft: 5 }}>Upload</Text>
        </TouchableOpacity>
      </View>
      {galleryImages.length > 0 ? (
        <View style={styles.uploadContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {galleryImages?.map((item, index) => (
              <View style={styles.con} key={index}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: item }}
                />
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.uploads}
            onPress={() => {
              setIsLoading(true);
              uploadToGallery();
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={{ color: "#ffffff", fontSize: 12 }}>upload</Text>
            )}
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {gallery?.map((image, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.imageContainer}
              onPress={() => setModalOpen(true)}
            >
              <Image style={styles.imagePermit} source={{ uri: image }} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

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
            {gallery?.map((image, index) => {
              return (
                <View key={index} style={styles.imageContainerModal}>
                  <Image
                    style={styles.imagePermitModal}
                    source={{ uri: image }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "50%",
    height: 150,
    padding: 1,
  },
  imagePermit: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    height: "100%",
    alignSelf: "center",
  },
  imagePermitModal: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
    width: "30%",
    padding: 5,
    borderRadius: 5,
  },
  uploadContainer: {
    width: "100%",
    padding: 10,
  },
  con: {
    width: 40,
    height: 30,
    backgroundColor: "#999999",
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 5,
  },
  uploads: {
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
});
