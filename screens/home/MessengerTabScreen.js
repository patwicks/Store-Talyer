import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../api/api";
import Conversation from "./Conversation";
import { io } from "socket.io-client";

// const winWidth = Dimensions.get('screen').width;
const winHeight = Dimensions.get('window').height;

// icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MessengerTabScreen({ navigation }) {
  // state variables
  const [id, setId] = useState(null);
  const [conversationList, setConversationList] = useState([]);
  const socket = useRef();

  //useffect hooks

  useEffect(() => {
    socket.current = io("https://talyer-socket-server.herokuapp.com");
  }, []);

  useEffect(() => {
    const userType = "store";
    if (id !== null) {
      socket.current.emit("addUser", id, userType);
      socket.current.on("getUsers", (users) => {
        // console.log(users);
      });
    }
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await AsyncStorage.getItem("findLoginCredential");
        const { userID } = await JSON.parse(result);
        if (result !== null) {
          setId(userID);
        }
      } catch (error) {
        console.log("There was an error getting the data from AsyncStorage!");
      }
    };
    const getConversation = async () => {
      try {
        if (id !== null) {
          const res = await API.get(`/api/conversation/${id}`);
          setConversationList(res.data);
        }
        return;
      } catch (e) {
        console.log(e.error);
      }
    };
    getData();
    getConversation();
  }, [id, conversationList]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {conversationList?.length <= 0 ? (
        <View style={styles.noConvo}>
          <Text style={styles.noConvoTxt}>No Conversation</Text>
          <MaterialCommunityIcons
            name="message-bulleted"
            size={50}
            color="#ccc"
          />
        </View>
      ) : (
        <>
          {conversationList?.map((c, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("Message", {
                  convoID: c._id,
                  currentUserID: id,
                  list: c,
                });
              }}
            >
              <Conversation list={c} currentUserID={id} />
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 30,
    flex: 1
  },
  noConvo: {
    height: winHeight*0.84,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noConvoTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ddd'
  }
});
