import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants';
import Dimensions from 'react-native';
import { Image } from 'react-native';
import { auth, storage } from '../firebase';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase'

function Account({ navigation }) {
    const [imageUri, setImageUri] = useState('')


    const logOut = () => {
        auth.signOut().then(() => {
            navigation.replace('LoginScreen')
        })

    }

    const downloadProfileImage = async () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                storage.ref("users/" + user.uid + '/profile').getDownloadURL().then(imgUrl => setImageUri(imgUrl))
            }
        })
    }
    useEffect(() => {
        downloadProfileImage()
    }, [])

    const getuser = () => {
        const user = firebase.auth().currentUser.uid
        console.log(user)
    }


    return (
        <View style={styles.container}>
            <View style={styles.userdetails}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <Text style={styles.name}> {firebase.auth().currentUser.displayName} </Text>
            </View>
            <Button title="Log Out" onPress={logOut} />


        </View>

    );
}

const styles = StyleSheet.create({
    userdetails: {
        flexDirection: 'row'
    },
    name: {
        paddingLeft: 10,
        alignSelf: 'center',
        fontSize: 23
    },
    container: {
        flex: 1,
        padding: 10

    }, image: {
        paddingLeft: 10,
        height: 100,
        width: 100,
        borderRadius: 50
    },
})

export default Account;