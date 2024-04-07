import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/Colors';
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';


const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    setTimeout(() => {
                        navigation.replace("Main");
                    }, 400);
                }
            } catch (error) {
                console.log("error", error);
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        };

        axios.post("http://192.168.29.112:8000/api/users/login", user)
            .then((response) => {
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                navigation.navigate("Main");
            })
            .catch((error) => {
                Alert.alert("Login error");
                console.log("error ", error);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.insideContainer}>
                <Image style={styles.image} source={{
                    uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
                }} />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
                        Login to Your Account
                    </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={styles.inputContainer} >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor={"gray"}
                            style={styles.input}
                            placeholder="Enter your Email"
                        />
                    </View>
                    <View style={styles.inputContainer} >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="password"
                            size={24}
                            color="gray"
                        />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor={"gray"}
                            style={styles.input}
                            placeholder="Enter your Password"
                        />
                    </View>
                    <View
                        style={styles.forgotPasswordContainer}
                    >
                        <Text>Keep me logged in</Text>
                        <Text style={styles.forgotPasswordText}>
                            Forgot Password
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: 45 }} />
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton} >
                    <Text style={styles.loginText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={{ marginTop: 10 }}
                >
                    <Text style={{ textAlign: "center", fontSize: 16 }}>
                        Don't have an account? Sign up
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
    },
    insideContainer: {
        marginTop: 50
    },
    image: {
        width: 150,
        height: 100,
        resizeMode: "contain"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderColor: "#D0D0D0",
        borderWidth: 1,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    input: {
        color: "gray",
        marginVertical: 10,
        width: 300,
        fontSize: 16,
    },
    loginButton: {
        width: 200,
        backgroundColor: "black",
        padding: 15,
        marginTop: 40,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 6,
    },
    loginText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        color: "white",
    },
    forgotPasswordContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
    },
    forgotPasswordText: { fontWeight: "500", color: "#007FFF" },
});
