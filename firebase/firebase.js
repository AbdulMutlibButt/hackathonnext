// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection, doc, setDoc, getDoc, onSnapshot, set, serverTimestamp, getDocs, query, where, orderBy, updateDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO3ZCm3_K203AZPxGClvQsx3MYnDa1nIg",
  authDomain: "hackathon-68079.firebaseapp.com",
  projectId: "hackathon-68079",
  storageBucket: "hackathon-68079.appspot.com",
  messagingSenderId: "288161459253",
  appId: "1:288161459253:web:e9931f2e85c27c32d4d57c",
  measurementId: "G-58TRTQN738"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)
export const signUp = (email, password) => { return createUserWithEmailAndPassword(auth, email, password) };

export const login = (email, password) => { return signInWithEmailAndPassword(auth, email, password) }


export const StoreUserDetails = async (name, email, password, uid) => {
    return await setDoc(doc(db, "UsersData", uid), {
      name: name,
      email: email,
      password: password,
      userid: uid,
    });
  };
  
  export const RegisterBlog = async (title, content, id,user) => {
    const myCollection = collection(db, "blogs"); // Creating a reference to your collection
  
    // Creating a new document with auto-generated ID and storing data in it
    const newDocRef = doc(myCollection);
    const newDocId = newDocRef.id;
  
    const myData = {
      title,
      content,
      userId: id,
      user,
      timestamp: serverTimestamp(),
      docId:newDocId
    };
    await setDoc(newDocRef, myData);
  };
  export const getCurrentUser = async (uid) => {
      const noteSnapshot = await getDoc(doc(db, 'UsersData', uid));
      if (noteSnapshot.exists()) {
       return  noteSnapshot.data();
        
      } else {
          console.log("Note doesn't exist");
          return null;
      }
   
  };
  export const getBlogs = async () => {
      const notesSnapshot = await getDocs(collection(db, "blogs"),orderBy('timestamp'));
      const notesList = notesSnapshot.docs.map((doc) => doc.data());
      return notesList;
  };
  
  export const fetchUserBlogs = async(id) =>{
    const ordersCollection = collection(db, 'blogs');
  
    const userOrdersQuery = query(ordersCollection,where('userId', '==', id));
  
    try {
      const querySnapshot = await getDocs(userOrdersQuery);
      const orders = querySnapshot.docs.map((doc) => doc.data());
     
      return orders;
    } catch (error) {
      console.error('Error fetching user blogs:', error);
      throw error;
    }
  }