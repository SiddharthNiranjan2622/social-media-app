import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import * as Permissons from 'expo-permissions'
import Constants from 'expo-constants';
import Dimensions from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button, Input } from 'react-native-elements';
import { Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { auth, storage } from '../firebase';
import { Alert } from 'react-native';

function Register({ navigation }) {
    const [imageUri, setImageUri] = useState()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

 

    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the photos")
    }

    useEffect(() => {
        requestPermission();
    }, [])

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync()
            if (!result.cancelled)
                setImageUri(result.uri)
        } catch (error) {
            console.log(error)
        }
    }
    const register = async () => {
        
        const response = await fetch(imageUri);
        const blob = await response.blob();

        auth
            .createUserWithEmailAndPassword(email, password).
            then(auth => {
                auth.user.updateProfile({
                    displayName:name,
                })
                storage.ref("users/" + auth.user.uid + '/profile').put(blob).then(() =>{
                    alert('success')
                }).catch(error => {
                    alert(error)
                })
            })
            .catch((error => alert(error.message)))
            
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View >
                <TouchableWithoutFeedback onPress={selectImage}>
                    <View style={styles.imageContainer}>
                        {!imageUri && (<MaterialCommunityIcons name="camera" size={40} />)}
                        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.inputContainer}>
                    <Input placeholder="Name" autoFocus value={name} onChangeText={text => setName(text)} />
                    <Input placeholder="Email Address" value={email} onChangeText={text => setEmail(text)} />
                    <Input placeholder="password" secureTextEntry value={password} onChangeText={text => setPassword(text)} />
                    <Button title="Submit" onPress={register} />
                    
                </View>

            </View>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 100
    },
    imageContainer: {
        backgroundColor: "#f8f4f4",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: 'center',
        height: 100,
        width: 100,
        overflow: 'hidden'

    },
    image: {
        height: 100,
        width: 100,


    },
    inputContainer: {
        width: 300
    }
})

export default Register;