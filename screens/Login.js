import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants';
import Dimensions from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { auth } from '../firebase';
import AuthContext from '../auth/context';
import * as firebase from 'firebase'

function Login({ navigation }) {
    const authContext = useContext(AuthContext)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home')
            }
        })
        return unsubscribe
    }, [])
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error))

       
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.textInput}>
                <Input placeholder="Email" autoFocus value={email} onChangeText={setEmail} />
                <Input placeholder="Password" autoFocus secureTextEntry value={password} onChangeText={setPassword} />

            </View>
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={signIn} />
                <Button title="Register" type="outline" onPress={() => navigation.navigate("RegisterScreen")} />
            </View>


        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        alignItems: "center",
        justifyContent: 'center',

    },
    textInput: {
        width: 300,
    },
    buttonContainer: {
        width: "80%"
    }
})

export default Login;