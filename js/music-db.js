import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, addDoc, collection, doc, updateDoc, deleteDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvDqWjXBwPdxFltt_R7v13Xzwiipgi_1A",
  authDomain: "nazmul-music-app.firebaseapp.com",
  projectId: "nazmul-music-app",
  storageBucket: "nazmul-music-app.appspot.com",
  messagingSenderId: "978436134068",
  appId: "1:978436134068:web:69e650a40af8eeac7673e1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function appendSongToFirebase(title, artist, likes = 0) {
  try {
    const docRef = await addDoc(collection(db, "MusicList"), {
      Title: title,
      Artist: artist,
      Likes: likes
    });
    return docRef.id;
  } catch (e) {
    // console.error("Error adding song: ", e);
    return null;
  }
}

export async function countLikes(songId, likes) {
  const songRef = doc(db, "MusicList", songId);
  try {
    const songDoc = await getDoc(songRef);
    if (songDoc.exists()) {
      await updateDoc(songRef, {
        Likes: likes
      });
      return Promise.resolve();
    } else {
      // console.error("Song not found");
      return Promise.reject(new Error("Song not found"));
    }
  } catch (e) {
    // console.error("Error updating likes: ", e);
    return Promise.reject(e);
  }
}

export async function deleteSong(songId) {
  const songRef = doc(db, "MusicList", songId);
  try {
    const songDoc = await getDoc(songRef);
    if (songDoc.exists()) {
      await deleteDoc(songRef);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Song not found"));
    }
  } catch (e) {
    return Promise.reject(e);
  }
}
async function getAllSong() {
  const songsCollection = collection(db, "MusicList");
  const snapshot = await getDocs(songsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
export { doc, appendSongToFirebase, getAllSong, db, getDoc, getDocs, updateDoc };
