import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../utils/UserContext.js";

const ProfileScreen = () => {
    const [user, setUser] = useState(null);
    const navigation = useNavigation()
    const { userId, setUserId } = useContext(UserType);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.29.112:8000/api/users/profile/${userId}`
                );
                const { user } = response.data;
                setUser(user);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchProfile();
    }, []);

    const logout = () => {
        clearAuthToken();
    }
    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("authToken");
        setUserId("");

        console.log("Cleared auth token");
        navigation.replace("Login")
    }

    return (
        <View style={{ marginTop: 55, padding: 15 }}>
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user?.name}</Text>
                    <View
                        style={{
                            paddingHorizontal: 7,
                            paddingVertical: 5,
                            borderRadius: 8,
                            backgroundColor: "#D0D0D0",
                        }}
                    >
                        <Text>Threads.net</Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                        marginTop: 15,
                    }}
                >
                    <View>
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                resizeMode: "contain",
                            }}
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                            }}
                        />
                    </View>

                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user?.username}</Text>
                    </View>
                </View>
                <Text style={{ color: "gray", fontSize: 15, marginTop: 10 }}>
                    {user?.followers?.length} followers
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20 }}>
                    <Pressable
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                        <Text>Edit Profile</Text>
                    </Pressable>

                    <Pressable
                        onPress={logout}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                        <Text>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({});