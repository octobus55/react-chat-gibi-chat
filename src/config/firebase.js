import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "your_api_key",
    authDomain:"your_auth_domain",
    databaseURL: "your_databaseURL",
    projectId: "your_projectId",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_senderId"
};

firebase.initializeApp(config);

export default firebase;