import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA4hhoiITIagcoUyxaGUYxlts6VZp2LL2A",
  authDomain: "iot-rpsls.firebaseapp.com",
  projectId: "iot-rpsls",
  storageBucket: "iot-rpsls.appspot.com",
  messagingSenderId: "553938635613",
  appId: "1:553938635613:web:6ca0e8f89a9a91333e76b4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      games: 0,
      wins: 0,
      created_at: new Date().toString(),
      updated_at: null,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const updateUser = async (win, game, result) => {
  const user = await getAuth(app).currentUser;
    
  const coll = await getDoc(doc(db, "users", user.uid));

  if (!coll.exists()) {
    if (game === "buttons") {
      await setDoc(doc(db, "users", user.uid));
    }
  }
  
  if (coll.exists()) {
    if (result === 'W') {
      if (game === "buttons") {
        const scoreFirebase = coll.data().scoreButtons;
  
        if (scoreFirebase < win) {
          await setDoc(doc(db, "users", user.uid), {
            scoreButtons: win,
            totalGamesButtons: coll.data().totalGamesButtons + 1,
            updated_at: new Date().toString(),
          });
        }
      }
    }
    else {
      await updateDoc(doc(db, "users", user.uid), {
        totalGamesButtons: coll.data().totalGamesButtons + 1,
        updated_at: new Date().toString(),
      });
    }
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  app,
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  updateUser,
  logout,
};