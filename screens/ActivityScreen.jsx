import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode';

import Colors from '../constants/Colors';
import { UserType } from '../utils/UserContext';
import User from '../components/User';

const ActivityScreen = () => {

    const [selectedButton, setSelectedButton] = useState("people");
    const [content, setContent] = useState("People Content");
    const [users, setUsers] = useState([]);

    const { userId, setUserId } = useContext(UserType);

    const handleButtonClick = (name) => {
        setSelectedButton(name);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const decoded = jwtDecode(token);
                const id = decoded.userId;
                setUserId(id);

                axios.get(`http://192.168.29.112:8000/api/users/user/${id}`)
                    .then((response) => {
                        setUsers(response.data.users);
                    }).catch((error) => {
                        console.log("error -> ", error);
                    });
            } catch (error) {
                console.log("fetch user", error);
            }
        };
        fetchUsers();
    }, [])

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Activity</Text>
                <View style={{ flexDirection: "row", alignItems: 'center', gap: 10, marginTop: 12 }}>
                    <TouchableOpacity
                        onPress={() => handleButtonClick("people")}
                        style={[
                            {
                                flex: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                backgroundColor: Colors.white,
                                borderRadius: 6,
                                borderWidth: 0.7
                            },
                            selectedButton === 'people' ? { backgroundColor: Colors.black } : null
                        ]}>
                        <Text style={[{
                            textAlign: 'center', fontWeight: 'bold'
                        },
                        selectedButton === "people" ? { color: Colors.white } : { color: Colors.black }
                        ]}>
                            People
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleButtonClick("all")}
                        style={[
                            {
                                flex: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                backgroundColor: Colors.white,
                                borderRadius: 6,
                                borderWidth: 0.7
                            },
                            selectedButton === 'all' ? { backgroundColor: Colors.black } : null
                        ]}>
                        <Text style={[{
                            textAlign: 'center', fontWeight: 'bold'
                        },
                        selectedButton === "all" ? { color: Colors.white } : { color: Colors.black }
                        ]}>
                            All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleButtonClick("requests")}
                        style={[
                            {
                                flex: 1,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                backgroundColor: Colors.white,
                                borderRadius: 6,
                                borderWidth: 0.7
                            },
                            selectedButton === 'requests' ? { backgroundColor: Colors.black } : null
                        ]}>
                        <Text style={[{
                            textAlign: 'center', fontWeight: 'bold'
                        },
                        selectedButton === "requests" ? { color: Colors.white } : { color: Colors.black }
                        ]}>
                            Requests
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {selectedButton === "people" && (
                        <View style={{ marginTop: 20 }}>
                            {users?.map((item, index) => (
                                <User key={index} item={item} />
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

export default ActivityScreen