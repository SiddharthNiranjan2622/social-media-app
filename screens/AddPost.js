import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants';
import { KeyboardAvoidingView } from 'react-native';
import { Image, Dimensions } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { auth, db, storage } from '../firebase';
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase'
import { ScrollView } from 'react-native';

const deviceWidth = Dimensions.get('window').width;


function AddPost({ navigation }) {
    const [imageUri, setImageUri] = useState()
    const [caption, setCaption] = useState("")
    const [postURL, setPostURL] = useState()
    const [profileId, setProfileId] = useState()
    const checkImageUri = async () => {
        auth.onAuthStateChanged(user => {

            storage.ref("users/" + user.uid + '/profile').getDownloadURL().then(imgUrl => console.log(imgUrl))

        })
    }
    const getProfileUrl = () => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                storage.ref("users/" + user.uid + '/profile').getDownloadURL().then(imgUrl => setPostURL(imgUrl))
            }
        })
        return unsubscribe;
    }

    useEffect(() => {
        getProfileUrl()
    })




    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync()
            if (!result.cancelled)
                setImageUri(result.uri)
        } catch (error) {
            console.log(error)
        }
    }
    const uploadImage = async () => {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const task = storage.ref(`users/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`).put(blob)

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                uploadPost(snapshot)
                console.log(snapshot)
            })
        }
        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)

    }


    const uploadPost = (downloadURL) => {


        db.collection('posts')
            .add({
                userUid:firebase.auth().currentUser.uid,
                profileImage: postURL,
                name: firebase.auth().currentUser.displayName,
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                navigation.goBack();
                setImageUri("")
                setCaption("")
            })
    }



    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <ScrollView>
                <Image style={styles.image} source={{ uri: imageUri }} />
                <Input placeholder="caption " value={caption} onChangeText={text => setCaption(text)} />
                <Button title="choose image" onPress={selectImage} />
                <Button title="upload Post" type="outline" onPress={uploadImage} />
            </ScrollView>

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight

    },
    image: {
        height: deviceWidth,
        width: deviceWidth,

    }
})

export default AddPost;