import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB_IbzH4aJ83I_byKahE7aDfZ0iVDHxXzM",
    authDomain: "social-media-app-pub.firebaseapp.com",
    projectId: "social-media-app-pub",
    storageBucket: "social-media-app-pub.appspot.com",
    messagingSenderId: "685556875251",
    appId: "1:685556875251:web:bb48ed6c0ecea918481c86"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }