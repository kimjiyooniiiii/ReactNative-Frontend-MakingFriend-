import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TextInput, Alert, Image } from "react-native";

const Detail = ({ navigation, route }) => {
    const [comment, setComment] = useState('');
    const { item } = route.params;
    const [comments, setComments] = useState([
        { id: 1, writer: "댓글작성자1", content: '댓글 1', date: "2022.01.01", replies: [{ id: 4, writer: "대댓글자1", content: '대댓글 1-1', date: "2022.01.02" }, { id: 5, writer: "대댓글자3", content: '대댓글 1-2', date: "2022.01.03" }] },
        { id: 2, writer: "댓글작성자2", content: '댓글 2', date: "2022.01.04", replies: [] },
        { id: 3, writer: "댓글작성자3", content: '댓글 3', date: "2022.01.05", replies: [{ id: 6, writer: "대댓글자2", content: '대댓글 3-1', date: "2022.01.06" }] },
    ]);

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={styles.commentContent}>{item.writer}</Text>
                <Text style={styles.commentContent}>{item.content + "  "}{item.date}</Text>

                {item.replies && item.replies.length > 0 && (
                    <FlatList
                        data={item.replies}
                        renderItem={renderCommentItem}
                        keyExtractor={(replyItem) => replyItem.id.toString()}
                        style={styles.replyList}
                    />
                )}
            </View>
        );
    };


    const deleteItem = () => {
        Alert.alert(
            '삭제',
            '정말로 삭제하시겠습니까?',
            [
                { text: '취소', onPress: () => { console.log("취소") }, style: 'cancel' },
                {
                    text: '삭제',
                    onPress: () => {
                        console.log("삭제 api 연동")
                    },
                    style: 'destructive',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => { },
            },
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => alert("검색 api 동작")}>
                        {/* <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/61/61022.png" }}
                            style={styles.image} /> */}
                    </TouchableOpacity>
            <TouchableOpacity onPress={deleteItem}>
                <Text>삭제 버튼</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>

            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TextInput
                placeholder="댓글을 입력하세요"
                value={comment}
                onChangeText={(text) => setComment(text)}
                style={styles.input}
            />
            <Button
                title='댓글 저장'
                onPress={() => alert(comment + "저장 api 연동")} style={styles.button}
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
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 18,
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 8,
    },
    commentItem: {
        padding: 10,
        marginVertical: 4,
    },
    editButton: {
        fontSize: 14,
        color: 'blue',
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
