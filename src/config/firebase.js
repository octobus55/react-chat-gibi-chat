import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA30MukiXceac4fASYvVWLa9Bu0Veuk_MQ",
    authDomain:"chatgibichat.firebaseapp.com",
    databaseURL: "https://chatgibichat.firebaseio.com",
    projectId: "chatgibichat",
    storageBucket: "chatgibichat.appspot.com",
    messagingSenderId: "110225602180"
};

firebase.initializeApp(config);

export default firebase;