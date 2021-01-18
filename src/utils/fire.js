import firebase from 'firebase'
import {useContext} from 'react'
import globalStateContext from '../App'
const firebaseConfig = {
   
};
const fb = firebase.initializeApp(firebaseConfig);


export default fb;
export const fstore = fb.firestore();
export const firedb = fb.database();
export const fauth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    fauth.signInWithPopup(provider).then((res)=>
    {
        console.log("signed in");
        if(res.credential) {
            console.log(res.user);
            fstore.collection("users").doc(res.user.uid).set({

                display_name: res.user.displayName,
                user_img: res.user.photoURL,
                action: "afk",
                action_item: "none",
                active: true,


            }, { merge: true }).then(() => {
                console.log("data written!");
            })
        }

    });

}
