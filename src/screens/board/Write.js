import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.log('Error while picking an image:', error);
    }
  };
  return (
    <View >
      <View style={styles.row}>
      <TouchableOpacity onPress={() => navigation.navigate('MainGet')}>
        <Image
          source={{ uri: "https://img.freepik.com/free-vector/letter-x-dry-brush-stroke-typography-vector_53876-177859.jpg?size=626&ext=jpg" }}
          style={styles.image}
        />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.text}>글쓰기</Text>
          <TouchableOpacity onPress={() => alert("생성 api 연동")}>
          <Text style={styles.text}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        placeholder="제목"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="내용을 입력해주세요."
        value={content}
        onChangeText={(text) => setContent(text)}
        style={styles.input}
      />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>사진</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  input: {
    margin: 10,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  button: {
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Write;