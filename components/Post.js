import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image,Dimensions } from 'react-native';
import { Text } from 'react-native';
import Constants from 'expo-constants';


const deviceWidth = Dimensions.get('window').width;

function Post({ profileImage, downloadURL, caption, name }) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.postheader}>
                <Image style={styles.profileIcon} source={{uri:profileImage}} />
                <Text style={styles.postUserName}>{name}</Text>
            </View>
            <Image style={styles.postImage} resizeMethod="resize" source={{uri:downloadURL}} />
            <Text style={styles.caption}>{caption}</Text>
            <View style={{padding:2}} />
            <View style={{padding:.5,backgroundColor:'#A9A9A9'}} />
            <View style={{padding:2}} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    postheader: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        
    },
    profileIcon: {
        borderRadius: 50,
        height: 40,
        width: 40

    },
    postUserName: {
        marginLeft: 7,
        alignSelf: 'center',
        fontSize: 17
    },
    postImage: {
        height:deviceWidth ,
        width:deviceWidth ,
        
    },
    caption:{
        fontSize: 14,
        color:"#808080",
        backgroundColor: '#F8F8F8',
    }

})

export default Post;