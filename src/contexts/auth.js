import React, {createContext, useState} from 'react';
import firebase from '../services/firebaseConnect';
import INF from '../config';
import { View } from 'react-native';

const pathDb = firebase.firestore().collection('Restaurante').doc(INF().ID_APP);

export const AuthContext = createContext({});
export default function AuthProvider({children}) {

  //console.log(INF().ID_APP);

  const estado = () =>{
    try {
      firebase.auth().currentUser.uid;
     return true;
    } catch (error) {
      return false;
    }
  }

    const [user, setUser] = useState(null);
    const [on, setOn] = useState(estado);
    
    async function deslogar(){
      await firebase.auth().signOut()
      .then(()=>{
        setOn(false);
        alert("saindo...");
      })
    }
//jalinittrader@gmail.com
    async function entrar(email, senha){
      
      await firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(async (value) => {
        let uid = value.user.uid;
        let eml = value.user.email;
        setOn(true);
        const userProfile = await pathDb.collection('adm').doc('Usuario').get();
        
        console.log(userProfile.data().senha);
        
        let data = {
          uid: uid,
          nome: userProfile.data().nome,
          email: eml,
          nivel: userProfile.data().nivel,
        }

        setUser(data);

      })
      .catch((e)=>{
        alert(e.code);
      })
    }

    async function cadastrarUsuario(email, senha, nome, nivel){
      await firebase.auth().createUserWithEmailAndPassword(email,senha)
      .then(async (value) => {
        let uid = value.user.uid;
        let eml = value.user.email;
        await firebase.firestore().collection('Restaurante').doc(INF().ID_APP).collection('adm').doc('Usuario').set({
          uid: uid,
          email:eml,
          senha: senha,
          nome: nome,
          nivel: nivel
          
        })
      })
      .catch((e)=>{
        alert(e.code);
      })
    }

  return (
    <AuthContext.Provider value={{ logado: on , user, cadastrarUsuario, entrar, deslogar}}>
        {children}
    </AuthContext.Provider>
  )
}