import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC7mIouCRiAPuHTX_v4nrdvmTZGs3f7VkQ",
  authDomain: "practice-9d72d.firebaseapp.com",
  databaseURL: "https://practice-9d72d.firebaseio.com",
  projectId: "practice-9d72d",
  storageBucket: "practice-9d72d.appspot.com",
  messagingSenderId: "312169552704",
  appId: "1:312169552704:web:f2684a5f86464b270eb8a5",
  measurementId: "G-08YRDYKK9P"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  
  const snapShot = await userRef.get()
  
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
    
  }
  
  return userRef;
  
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // To move shop data to firebase, will fire only one time
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  });
  
  return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, name, prices } = doc.data();
    return {
      routeName: encodeURI(name),
      id: doc.id,
      title,
      prices
    }
  });
  
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const database = firebase.database();
export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;