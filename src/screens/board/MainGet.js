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
import { useFocusEffect } from "@react-navigation/native";

const MainGet = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [contents, setContents] = useState([]);
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBoard();
  }, [contents]);

  const fetchBoard = () => {
    if (isLoading) return; // 이미 데이터를 불러오고 있는 중이라면 중복 요청 방지

    setIsLoading(true);

    // fetch(`${API_URL}/board/list?page=${page}`, {
    fetch(`http://172.20.10.7:8080/board/list?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(JSON.stringify(res.data.postId));
        // setContents(res.data);
        if (res.data.length > 0) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
          setContents((prevContents) => [...prevContents, ...res.data]); // 새로운 데이터 추가
        }
        setIsLoading(false); // 데이터 불러오기 완료
        // user1 = JSON.stringify(res.data);
        // console.log(user1);
      })
      .catch((error) => {
        setIsLoading(false); // 데이터 불러오기 실패 시도
        console.error(error);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", item.postId)}
      >
        <View style={styles.item}>
          <Text>포스트아이디: {item.postId}</Text>
          <Text>글쓴이: {item.writer}</Text>
          <Text>생성날짜: {item.createdDt}</Text>
          <Text>제목: {item.title}</Text>
          <Text>내용: {item.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        data={contents}
        renderItem={renderItem}
        keyExtractor={(contents) => contents["postId"]}
        // keyExtractor={(item) => item.id.toString()} // 각 아이템에 대한 고유한 키를 지정합니다.
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={fetchBoard} // 스크롤이 끝에 도달하면 fetchMoreData 함수 호출
        onEndReachedThreshold={0.8} // onEndReached가 어느 지점에서 호출될지에 대한 설정 (0.1은 10% 지점을 의미)
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
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  //   borderColor: "#ccc",
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
