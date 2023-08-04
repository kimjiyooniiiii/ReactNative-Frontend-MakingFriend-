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

const Detail = ({ navigation, route }) => {
  const postId = route.params;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  const fetchPostData = () => {
    fetch(`${API_URL}:8080/board?boardId=${postId}`, {
      // fetch(`http://172.20.10.7:8080/board?boardId=${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        // console.log(JSON.stringify(res.data.replyGroup));
        setPost(res.data);
        setComments(res.data.replyGroup);
      })
      .catch((error) => {
        console.error("Error during fetchPostData:", error);
        setPost(null); // Set post to null in case of an error
      });
  };

  const renderCommentItem = ({ item }) => {
    // console.log(JSON.stringify(item));
    return (
      <View style={styles.commentItem}>
        <Text style={styles.commentContent}>
          댓글 닉네임: {item.parentNickname}
        </Text>
        <Text style={styles.commentContent}>
          댓글 내용: {item.parentContent + "  "}
          {item.date}
        </Text>

        {item.children && item.children.length > 0 && (
          <FlatList
            data={item.children}
            renderItem={renderCommentItem}
            keyExtractor={(child) => child.replyId.toString()}
            style={styles.replyList}
          />
        )}
      </View>
    );
  };

  const _handleDeletePostButtonPress = () => {
    fetch(`http://172.20.10.7:8080/board?boardId=${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          navigation.navigate("MainGet");
        }
      })
      .catch((error) => {
        console.error("Error during deletePost:", error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => alert("검색 api 동작")}>
        {/* <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/61/61022.png" }}
                            style={styles.image} /> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={_handleDeletePostButtonPress}>
        <Text>삭제 버튼</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>

      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(comments) => comments.replyId.toString()}
      />
      <TextInput
        placeholder="댓글을 입력하세요"
        value={comment}
        onChangeText={(text) => setComment(text)}
        style={styles.input}
      />
      <Button
        title="댓글 저장"
        onPress={() => alert(comment + "저장 api 연동")}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 18,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  commentItem: {
    padding: 10,
    marginVertical: 4,
  },
  editButton: {
    fontSize: 14,
    color: "blue",
    marginLeft: 10,
  },
  editTextInput: {
    fontSize: 16,
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  replyList: {
    marginLeft: 16,
  },
});

export default Detail;
