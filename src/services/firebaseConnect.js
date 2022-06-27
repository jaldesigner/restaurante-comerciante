import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

if(!firebase.app.length){
    alert('Falha ao conectar com o Firestore');
}

export default firebase;
