import { StyleSheet, Text, View, ScrollView, Image, RefreshControl } from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { UserType } from "../utils/UserContext.js";

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { userId, setUserId } = useContext(UserType);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
        };

        fetchUsers();
    }, []);
    useEffect(() => {
        fetchPosts();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Call the fetchPosts function or any other function to fetch data
        fetchPosts().then(() => setRefreshing(false));
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://192.168.29.112:8000/api/posts");
            const fetchedPosts = response.data.posts;
            // Fetch user details for each post
            const postsWithUserDetails = await Promise.all(
                fetchedPosts.map(async (post) => {
                    const userResponse = await axios.get(`http://192.168.29.112:8000/api/users/profile/${post.user._id}`);
                    const user = userResponse.data.user;
                    return { ...post, user };
                })
            );
            setPosts(postsWithUserDetails);
        } catch (error) {
            console.log("error fetching posts", error);
        }
    };

    const handleLike = async (postId) => {
        try {
            const response = await axios.put(
                `http://192.168.29.112:8000/api/posts/${postId}/${userId}/like`
            );
            const updatedPost = response.data;

            const updatedPosts = posts?.map((post) =>
                post?._id === updatedPost._id ? updatedPost : post
            );

            setPosts(updatedPosts);
        } catch (error) {
            console.log("Error liking the post", error);
        }
    };

    const handleDislike = async (postId) => {
        try {
            const response = await axios.put(
                `http://192.168.29.112:8000/api/posts/${postId}/${userId}/unlike`
            );
            const updatedPost = response.data;
            // Update the posts array with the updated post
            const updatedPosts = posts.map((post) =>
                post._id === updatedPost._id ? updatedPost : post
            );
            console.log("updated ", updatedPosts)

            setPosts(updatedPosts);
        } catch (error) {
            console.error("Error unliking post:", error);
        }
    };
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ marginTop: 50, flex: 1, backgroundColor: "white" }}>
            <View style={{ alignItems: "center", marginTop: 20 }}>
                <Image
                    style={{ width: 60, height: 40, resizeMode: "contain" }}
                    source={{
                        uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
                    }}
                />
            </View>

            <View style={{ marginTop: 20 }}>
                {posts?.map((post, index) => (
                    <View key={index}
                        style={{
                            padding: 15,
                            borderColor: "#D0D0D0",
                            borderTopWidth: 1,
                            flexDirection: "row",
                            gap: 10,
                            marginVertical: 10,
                        }}
                    >
                        <View>
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
                        </View>

                        <View>
                            <Text
                                style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
                            >
                                {post?.user?.username}
                            </Text>
                            <Text>{post?.content}</Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 10,
                                    marginTop: 15,
                                }}
                            >
                                {post?.likes?.includes(userId) ? (
                                    <AntDesign
                                        onPress={() => handleDislike(post?._id)}
                                        name="heart"
                                        size={18}
                                        color="red"
                                    />
                                ) : (
                                    <AntDesign
                                        onPress={() => handleLike(post?._id)}
                                        name="hearto"
                                        size={18}
                                        color="black"
                                    />
                                )}

                                <FontAwesome name="comment-o" size={18} color="black" />

                                <Ionicons name="share-social-outline" size={18} color="black" />
                            </View>

                            <Text style={{ marginTop: 7, color: "gray" }}>
                                {post?.likes?.length} likes • {post?.replies?.length} reply
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});