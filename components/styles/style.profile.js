import { StyleSheet, Platform, StatusBar } from "react-native";

import Color from "../config/Color";

const Styles = StyleSheet.create({
  // containers
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
  },
  //Top profile main container
  topProfile: {
    height: 350,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  // Details container
  detailsContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  infoContainer: {
    padding: 5,
    flex: 1,
  },
  // Details container
  detailsContainer: {
    flex: 1,
    paddingVertical: 5,
  },
  infoContainer: {
    padding: 5,
    flex: 1,
  },
  coverPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  editCover: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderColor: Color.level2,
    borderWidth: 1,
    position: "absolute",
    bottom: 4,
    right: 10,
    zIndex: 999,
  },
  circleContainer: {
    width: 130,
    height: 130,
    borderWidth: 3,
    borderRadius: 150 / 2,
    marginTop: 20,
    borderColor: Color.white,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  profileImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    borderWidth: 3,
  },
  editProfile: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    // backgroundColor: Color.level4,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderColor: Color.level2,
    borderWidth: 1,
    position: "absolute",
    bottom: 4,
    zIndex: 999,
  },

  topName: {
    fontFamily: "Poppins-SemiBold",
    color: Color.level4,
    fontSize: 18,
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffe6e6",
    color: Color.error,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  success: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ccffe6",
    color: "#00cc66",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  btnUpload: {
    backgroundColor: Color.secondary,
    borderRadius: 5,
    paddingVertical: 3,
    width: "30%",
    alignSelf: "center",
    marginVertical: 15,
  },
  btnUploadCover: {
    backgroundColor: Color.secondary,
    borderRadius: 5,
    paddingVertical: 3,
    width: "50%",
    alignSelf: "center",
    marginVertical: 15,
  },
  infoHeadTextContainer: {
    padding: 10,
    marginTop: 5,
    backgroundColor: "#4da6ff",
    alignItems: "center",
    borderRadius: 5,
  },

  nameContainer: {
    flex: 2,
    padding: 20,
    backgroundColor: Color.level4,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  info: {
    fontFamily: "Poppins-Regular",
  },
  infContainer: {
    padding: 20,
    backgroundColor: Color.level4,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btnLogout: {
    backgroundColor: Color.secondary,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  mapContainer: {
    width: "100%",
    height: 250,
    marginBottom: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  mapStore: {
    height: "100%",
    width: "100%",
  },
  btnContainerTop: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnTop: {
      borderRadius: 5,
      backgroundColor: "#f2f2f2",
      width: "45%",
      alignItems: "center",
      justifyContent: "center",
      padding: 5
  },
  btnTextTop: {
      color: "#404040",
      fontSize: 12,
      fontWeight: "700"
  }
});

export default Styles;
