import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar'

function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.login}>
                <Button title="Login" onPress={() => navigation.navigate("LoginScreen")} />
            </View>
            <Button title="Register" onPress={() => navigation.navigate("RegisterScreen")} type="outline" />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,

        justifyContent: 'center',
        padding: 10,
        marginTop: 10
    },
    login:{
        paddingBottom:20
    }
})

export default WelcomeScreen;