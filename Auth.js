import React, { useState } from 'react';

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebaseConfig from '../../firebase.config'

const firebaseApp = firebase.initializeApp(firebaseConfig);

const Auth = () => {
    const [user, setUser] = useState({
        isSginedIn: false,
        name: '',
        email: '',
        photo: ''
    });
    const provider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;

                const signedInUser = {
                    isSginedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }

                setUser(signedInUser);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            });
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signOutUser = {
                    isSginedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setUser(signOutUser);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            });


    }

    return (
        <div>
            {
                user.isSginedIn ? <button onClick={() => handleSignOut()} >Sign Out</button> : <button onClick={() => handleSignIn()} >Sign in</button>
            }

            {
                user.isSginedIn && <div>
                    {user.photo && <img src={user.photo} alt=''></img>}
                    <p>Welcome,  {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            }
        </div>
    );
}

export default Auth;
