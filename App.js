import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './screens/Home';
import AddPost from './screens/AddPost';
import Account from './screens/Account';
import { NavigationContainer } from '@react-navigation/native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Post from './components/Post';

const Stack = createStackNavigator();
const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="LoginScreen" component={Login}/>
    <Stack.Screen name="RegisterScreen" component={Register}/>
    <Stack.Screen name="Home" component={TabNavigator}/>
    
    
  </Stack.Navigator>

)

const Tab = createBottomTabNavigator();
  const TabNavigator = () => (

    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={Home} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Add Post" component={AddPost} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Account" component={Account} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        )
      }} />
    </Tab.Navigator>

  )

  export default function App() {
    return (

      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
      

    )



  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
