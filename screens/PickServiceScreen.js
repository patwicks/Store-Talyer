import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import PickerCheckBox from "react-native-picker-checkbox";
// icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
// import KeyboardWrapper from "../utils/KeyboardWrapper";

const winHeigth = Dimensions.get("window").height;
export default function PickerServiceScreen({ navigation, route }) {
  // params
  const { storeData } = route.params;
  const [services, setServices] = useState([]);
  const [service, setService] = useState("");

  const items = [
    {
      id: 1,
      service: "Brake Service and Repair",
    },
    {
      id: 2,
      service: "Car Wash",
    },
    {
      id: 3,
      service: "Vehicle Maintenance & Inspections",
    },
    {
      id: 4,
      service: "Engine and Transmission Repair",
    },
    {
      id: 5,
      service: "Steering, Suspension & Wheel Alignment",
    },
    {
      id: 6,
      service: "Exhaust System Repairs",
    },
    {
      id: 7,
      service: "Change Oil",
    },
    {
      id: 8,
      service: "Batteries and Charging Systems",
    },
    {
      id: 9,
      service: "Heating and AC Repairs",
    },
    {
      id: 10,
      service: "Tune-Ups",
    },
  ];

  const handleConfirm = (pItems) => {
    pItems.map((item) => {
      return setServices((prev) => [...prev, item.service]);
    });
  };
  const addService = () => {
    return setServices((prev) => [...prev, service]);
  };

  const resetSelectedServices = () => {
    return setServices([]);
  };
  return (
    // <KeyboardWrapper>
    <View style={styles.container}>
      {/* <Text> Choose Services </Text> */}
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <PickerCheckBox
            data={items}
            headerComponent={
              <Text style={{ fontSize: 25 }}>Talyer Services</Text>
            }
            OnConfirm={(pItems) => {
              handleConfirm(pItems);
            }}
            ConfirmButtonTitle="OK"
            DescriptionField="service"
            KeyField="id"
            placeholder="Click to choose services..."
            arrowColor="#3399ff"
            placeholderSelectedItems="$count Selected Service(s)"
            placeholderTextColor="#ffffff"
          />
          <AntDesign
            style={styles.icon}
            name="downcircle"
            size={24}
            color="white"
          />
        </View>
      </View>
      <Text style={styles.textSelected}>Selected Services</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          width: 30,
          height: 30,
          borderRadius: 30 / 2,
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
        onPress={() => {
          resetSelectedServices();
        }}
      >
        <FontAwesome name="refresh" size={24} color="#0073e6" />
      </TouchableOpacity>
      {/* 
        Check if 'services'  state variable is not null before to render the
        selected Services
      */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          height: winHeigth * 0.5,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {services !== null
          ? services.map((item, index) => {
              return (
                <View style={styles.selectedList} key={index}>
                  <Text>- {item}</Text>
                </View>
              );
            })
          : null}
      </ScrollView>

      <View style={styles.otherServices}>
        <Text style={styles.otherLabel}>Others: </Text>
        <TextInput
          style={styles.otherTxt}
          placeholder="Type service here..."
          value={service}
          onChangeText={(service) => setService(service)}
        />
        <TouchableOpacity
          style={styles.addOtherService}
          onPress={() => {
            addService();
            setService("");
          }}
        >
          <MaterialIcons name="add" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PermitScreen", {
            storeData: storeData,
            services: services,
          });
        }}
        style={styles.btnNext}
        disabled={services.length <= 0 ? true : false}
      >
        <Text style={styles.txtnxt}>Next</Text>
      </TouchableOpacity>
    </View>
    // </KeyboardWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  options: {
    width: "90%",
  },
  pickerContainer: {
    backgroundColor: "#3399ff",
    width: "90%",
    fontWeight: "bold",
    flexDirection: "row",
    borderRadius: 5,
    marginTop: 50,
  },
  picker: {
    width: "100%",
  },
  textSelected: {
    fontSize: 18,
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
    color: "#404040",
    fontFamily: "Poppins-Regular",
  },
  selectedList: {
    borderWidth: 0.5,
    padding: 10,
    width: "90%",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    borderColor: "#cccccc",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 6,
  },
  btnNext: {
    borderRadius: 3,
    width: "90%",
    backgroundColor: "#3399ff",
    padding: 10,
    marginVertical: 20,
  },
  txtnxt: {
    textTransform: "uppercase",
    letterSpacing: 1,
    alignItems: "center",
    textAlign: "center",
    fontSize: 16,
    color: "#f2f2f2",
  },
  otherServices: {
    width: "90%",
    flexDirection: "row",
    padding: 5,
    marginTop: 20,
  },
  otherTxt: {
    borderBottomWidth: 1,
    borderBottomColor: "#999999",
    fontSize: 16,
    width: "80%",
    padding: 5,
  },
  otherLabel: {
    fontSize: 16,
    width: "20%",
    color: "#111111",
  },
  addOtherService: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
