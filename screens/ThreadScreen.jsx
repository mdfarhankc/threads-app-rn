import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TextInput,
    Button,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';

import { UserType } from "../utils/UserContext.js";

const ThreadsScreen = () => {

    useEffect(() => {
        const fetchUsers = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchUsers();
    }, []);

    const { userId, setUserId } = useContext(UserType);
    const [content, setContent] = useState("");

    const handlePostSubmit = () => {
        const postData = {
            userId,
        };

        if (content) {
            postData.content = content;
        }

        axios
            .post("http://192.168.29.112:8000/api/create-post", postData)
            .then((response) => {
                setContent("");
            })
            .catch((error) => {
                console.log("error creating post", error);
            });
    };
    return (
        <SafeAreaView style={{ padding: 10, marginTop: 30 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    padding: 10,
                }}
            >
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        resizeMode: "contain",
                    }}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                    }}
                />

                <Text>Farhan</Text>
            </View>

            <View style={{ flexDirection: "row", marginLeft: 10 }}>
                <TextInput
                    value={content}
                    onChangeText={(text) => setContent(text)}
                    placeholderTextColor={"black"}
                    placeholder="Type your message..."
                    multiline
                />
            </View>

            <View style={{ marginTop: 20 }} />

            <Button onPress={handlePostSubmit} title="Share Post" />
        </SafeAreaView>
    );
};

export default ThreadsScreen;

const styles = StyleSheet.create({});