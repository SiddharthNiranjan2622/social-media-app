import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import Dimensions from 'react-native';
import { Button } from 'react-native-elements';
import { auth, db } from '../firebase';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import Post from '../components/Post';
import * as firebase from 'firebase'
import AuthContext from '../auth/context';

function Home({ navigation }) {
    

    const [postData, setPostData] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('posts')
            .orderBy('creation','desc')
            .onSnapshot((snapshot) => {
                setPostData(snapshot.docs.map((doc) => doc.data()))
            })
        return unsubscribe;
    }, [navigation])
  


    return (
        <View style={styles.container}>

            <StatusBar style="auto" />

            <FlatList
                data={postData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ flex: 1,  }} >
                    <Post name={item.name} caption={item.caption} downloadURL={item.downloadURL} profileImage={item.profileImage}  />

                    </View>
                )}

            />


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:5

    },
    scrollViewContainer: {
        height: '100%'
    }
})

export default Home;