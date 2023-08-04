import React, { useState, useRef, useEffect, useContext } from "react";

import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../contexts";
import { API_URL } from "@env";

const Write = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useContext(UserContext);
  const [userInput, setUserInput] = useState({
    title: "",
    content: "",
  });

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.log("Error while picking an image:", error);
    }
  };

  const _handleWritePostButtonPress = () => {
    fetch(`${API_URL}/board`, {
      // fetch(`http://192.168.0.54:8080/board`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        // setUserId(userInput.userId);
        navigation.navigate("MainGet");
      })
      .catch((error) => {
        console.error("Error during writePost:", error);
      });
  };

  const _handleUserInputChange = (fieldName, value) => {
    // console.log(fieldName + ": " + value);
    setUserInput({
      ...userInput,
      [fieldName]: value,
    });
  };

  return (
    <View>
      <View style={styles.row}>
        {/* <TouchableOpacity onPress={() => navigation.navigate("MainGet")}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/letter-x-dry-brush-stroke-typography-vector_53876-177859.jpg?size=626&ext=jpg",
            }}
            style={styles.image}
          />
        </TouchableOpacity> */}
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={_handleWritePostButtonPress}>
            <Text style={styles.finButton}>완료</Text>
          </TouchableOpacity>
          <Text style={styles.text}>글쓰기</Text>
        </View>
      </View>
      <TextInput
        placeholder="제목"
        onChangeText={(value) => _handleUserInputChange("title", value)}
        style={styles.input}
      />

      <TextInput
        placeholder="내용을 입력해주세요."
        onChangeText={(value) => _handleUserInputChange("content", value)}
        style={styles.input}
      />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>사진</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 20,
  },
  finButton: {
    marginLeft: 300,
    fontSize: 16,
    fontWeight: "bold",
    padding: 20,
    backgroundColor: "skyblue",
  },
  container: {
    flex: 1,
  },
  input: {
    margin: 10,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  button: {},
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Write;
