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

  const coll = await getDoc(doc(db, "leaderboard", user.uid));

  if (!coll.exists()) {
    if (game === "webcam") {
      await setDoc(doc(db, "leaderboard", user.uid), {
        streaksWebcam: parseInt(win),
        winsWebcam: parseInt(win),
        totalGamesWebcam: 1,
        totalGamesButtons: 0,
        winsButtons: 0,
        streaksButtons: 0,
        name: user.displayName,
        updated_at: new Date().toString(),
      });
    }
    if (game === "buttons") {
      await setDoc(doc(db, "leaderboard", user.uid), {
        streaksButtons: parseInt(win),
        winsButtons: parseInt(win),
        totalGamesButtons: 1,
        totalGamesWebcam: 0,
        winsWebcam: 0,
        streaksWebcam: 0,
        name: user.displayName,
        updated_at: new Date().toString(),
      });
    }
  }

  if (coll.exists()) {
    if (result === "W") {
      if (game === "webcam") {
        console.log("webcam");
        const scoreFirebase = coll.data().streaksWebcam;

        if (scoreFirebase < win) {
          await updateDoc(doc(db, "leaderboard", user.uid), {
            streaksWebcam: win,
            winsWebcam: coll.data().winsWebcam + 1,
            totalGamesWebcam: coll.data().totalGamesWebcam + 1,
            updated_at: new Date().toString(),
          });
        }
        else {
          await updateDoc(doc(db, "leaderboard", user.uid), {
            winsWebcam: coll.data().winsWebcam + 1,
            totalGamesWebcam: coll.data().totalGamesWebcam + 1,
            updated_at: new Date().toString(),
          });
        }
      }

      if (game === "buttons") {
        const scoreFirebase = coll.data().streaksButtons;

        if (scoreFirebase < win) {
          await updateDoc(doc(db, "leaderboard", user.uid), {
            streaksButtons: win,
            winsButtons: coll.data().winsButtons + 1,
            totalGamesButtons: coll.data().totalGamesButtons + 1,
            updated_at: new Date().toString(),
          });
        }
        else {
          await updateDoc(doc(db, "leaderboard", user.uid), {
            winsButtons: coll.data().winsButtons + 1,
            totalGamesButtons: coll.data().totalGamesButtons + 1,
            updated_at: new Date().toString(),
          });
        }
      }
    }
    else {
      if (game === "webcam") {
      await updateDoc(doc(db, "leaderboard", user.uid), {
        totalGamesWebcam: coll.data().totalGamesWebcam + 1,
        updated_at: new Date().toString(),
      });
      }
      if (game === "buttons") {
        await updateDoc(doc(db, "leaderboard", user.uid), {
          totalGamesButtons: coll.data().totalGamesButtons + 1,
          updated_at: new Date().toString(),
        });
      }
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