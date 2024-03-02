// Import the necessary Firestore SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, addDoc, collection, doc, updateDoc, deleteDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


// Rest of the code...

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvDqWjXBwPdxFltt_R7v13Xzwiipgi_1A",
  authDomain: "nazmul-music-app.firebaseapp.com",
  projectId: "nazmul-music-app",
  storageBucket: "nazmul-music-app.appspot.com",
  messagingSenderId: "978436134068",
  appId: "1:978436134068:web:69e650a40af8eeac7673e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get a Firestore instance

// Function to add a song to Firestore
async function addSongToFirebase(title, artist, likes = 0) {
  console.log(title, artist);
  try {
    const docRef = await addDoc(collection(db, "MusicList"), {
      Title: title,
      Artist: artist,
      Likes: likes
    });
    console.log("Song added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding song: ", e);
    return null;
  }
}

// Define the updateLikes function
export async function updateLikes(songId, likes) {
  const songRef = doc(db, "MusicList", songId);
  try {
    const songDoc = await getDoc(songRef);
    if (songDoc.exists()) {
      await updateDoc(songRef, {
        Likes: likes
      });
      console.log("Likes updated for song with ID: ", songId);
      return Promise.resolve(); // Resolve the promise
    } else {
      console.error("Song not found");
      return Promise.reject(new Error("Song not found")); // Reject the promise
    }
  } catch (e) {
    console.error("Error updating likes: ", e);
    return Promise.reject(e); // Reject the promise
  }
}

// Define the removeSong function
export async function removeSong(songId) {
  const songRef = doc(db, "MusicList", songId);
  try {
    const songDoc = await getDoc(songRef);
    if (songDoc.exists()) {
      await deleteDoc(songRef);
      console.log("Song removed with ID: ", songId);
      return Promise.resolve(); // Resolve the promise
    } else {
      console.error("Song not found");
      return Promise.reject(new Error("Song not found")); // Reject the promise
    }
  } catch (e) {
    console.error("Error removing song: ", e);
    return Promise.reject(e); // Reject the promise
  }
}

// Function to get all songs from Firestore
async function getAllSongs() {
  const songsCollection = collection(db, "MusicList");
  const snapshot = await getDocs(songsCollection);
  // const songs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // console.log(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  // return songs
}

// Export the functions for use in other modules
export { doc, addSongToFirebase, getAllSongs, db,getDoc,getDocs,updateDoc };





