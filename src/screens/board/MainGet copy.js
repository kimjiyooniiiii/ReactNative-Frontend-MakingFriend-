import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { API_URL } from "@env";
import { UserContext } from "../../contexts";

const MainGet = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const content = [];
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchUserInfo(); // 최초 렌더링 시 사용자 정보를 가져오는 함수 호출
  }, [user.accessToken, isFocused]); // useEffect의 의존성 배열에 isFocused 추가

  const fetchUserInfo = () => {
    // fetch(`${API_URL}/board/list?page=${page}`, {
    fetch(`${API_URL}/board/list?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(JSON.stringify(res));
        // user1 = JSON.stringify(res.data);
        // console.log(user1);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { item })}>
      <View style={styles.item}>
        <Text>{item.name}</Text>
        <Text>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );
  const ItemSeparator = () => <View style={styles.separator} />;
  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.row}>
          <TextInput
            style={styles.searchText}
            placeholder="검색"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity onPress={() => alert("검색 api 동작")}>
            <Image
              source={{
                uri: "https://play-lh.googleusercontent.com/WL9oSrJxfO6XDrSnuERVcjFXN--XztDibPGtAxIJsJBfm2ZAv4WvkR5yFuOcFKKR0_A=w240-h480-rw",
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // 각 아이템에 대한 고유한 키를 지정합니다.
        ItemSeparatorComponent={ItemSeparator}
      />
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Write")}>
          <Text style={styles.text}> 글쓰기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    marginBottom: 20,
  },
  button: {
    margin: 0,
    padding: 0,
  },
  textContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20, // 원하는 여백을 추가할 수 있습니다.
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20, // 왼쪽과 오른쪽에 여백을 주기 위해 추가
  },
  searchText: {
    width: 1700,
    height: 40,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  separator: {
    height: 1,
    backgroundColor: "black", // 검정색으로 구분선 설정
  },
});

export default MainGet;
