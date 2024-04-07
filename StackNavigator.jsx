import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ThreadScreen from './screens/ThreadScreen';
import ActivityScreen from './screens/ActivityScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const StackNavigator = () => {

    const BottomTabs = () => {
        return (<Tabs.Navigator>
            <Tabs.Screen name='Home' component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarLabelStyle: { color: "black" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return focused ? (<Entypo name="home" size={24} color="black" />) : (<AntDesign name="home" size={24} color="black" />)
                    }
                }} />
            <Tabs.Screen name='Thread' component={ThreadScreen}
                options={{
                    tabBarLabel: "Create",
                    tabBarLabelStyle: { color: "black" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return focused ? (<Ionicons name="create" size={24} color="black" />) : (<Ionicons name="create-outline" size={24} color="black" />)
                    }
                }} />
            <Tabs.Screen name='Activity' component={ActivityScreen}
                options={{
                    tabBarLabel: "Activity",
                    tabBarLabelStyle: { color: "black" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return focused ? (<AntDesign name="heart" size={24} color="black" />) : (<AntDesign name="hearto" size={24} color="black" />)
                    }
                }} />
            <Tabs.Screen name='Profile' component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarLabelStyle: { color: "black" },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return focused ? (<Ionicons name="person" size={24} color="black" />) : (<Ionicons name="person-outline" size={24} color="black" />)
                    }
                }} />
        </Tabs.Navigator>);
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Main' component={BottomTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator