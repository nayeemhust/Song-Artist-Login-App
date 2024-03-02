import { addSongToFirebase, updateLikes, removeSong, getAllSongs, doc, db, updateDoc } from "./music-db.js";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
        })
        .catch((error) => {

        });
} else {
}

// Done
// Function to add a song to Firestore
async function addSong() {

    const title = document.getElementById('Title').value
    const artist = document.getElementById('Artist').value

    const errormsg = document.getElementById('errormsg');

    if (!title.trim() && !artist.trim()) {
        errormsg.textContent = 'Title and Artist name of the song both are required.';
        return;
    }

    if (title === '') {
        errormsg.textContent = 'Title of the song is required.';
        return;
    }

    if (artist === '') {
        errormsg.textContent = 'Artist name of the song is required.';
        return;
    }

    errormsg.textContent = '';
    
    addSongToFirebase(title, artist)
    displaySong()
}

// TODO
// Function to remove the song from the UI
// function removeSongFromUI(songId) {
//     const songElement = document.getElementById(songId);
//     if (songElement) {
//         songElement.remove();
//         console.log('Song removed from UI with ID: ', songId);
//     } else {
//         console.error('Song element not found in the UI');
//     }
// }

// Done
async function displaySong() {
    let songs = await getAllSongs()

    // empty list
    document.getElementById('musicList').innerHTML = ''

    songs.forEach(({ Title: title, Artist: artist, Likes: likes, id: songId }) => {

        let docId; // Define docId outside the displaySong function to ensure its availability

        // Add the song to Firestore using the addSong function from music-db.js
        // const songId = addSong(title, artist);
        docId = songId; // Store the document ID in the outer scope
        // Display the song on the page
        const trackList = document.getElementById('musicList');
        const trackItem = document.createElement('div');
        trackItem.className = 'songList';
        trackItem.style.position = 'relative'; // Set position relative
        trackItem.style.width = '270px'; // Set width to prevent overlap
        trackItem.style.height = '20px'; // Set height to prevent overlap

        // Create elements for title, artist, and likes
        const titleElement = document.createElement('div');
        titleElement.innerHTML = `<strong>${title}</strong>`; // Wrap title with strong tag
        titleElement.style.position = 'absolute'; // Set position absolute
        titleElement.style.left = '0'; // Position at the left
        titleElement.style.top = '0'; // Position at the top

        const artistElement = document.createElement('div');
        artistElement.textContent = artist;
        artistElement.style.position = 'absolute'; // Set position absolute
        artistElement.style.left = '0'; // Position at the left
        artistElement.style.bottom = '0'; // Position at the bottom

        const likesElement = document.createElement('span');
        let likesCount = likes; // Initialize likes count
        likesElement.textContent = `Likes: ${likesCount}`; // Initial likes count
        likesElement.style.position = 'absolute'; // Set position absolute
        likesElement.style.right = '0'; // Position at the right
        likesElement.style.bottom = '0'; // Position at the bottom

        // Append the elements to the trackItem div
        trackItem.appendChild(titleElement);
        trackItem.appendChild(artistElement);
        trackItem.appendChild(likesElement); // Append Likes text to trackItem

        trackList.appendChild(trackItem);

        // Create a new div to contain the buttons
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'buttonContainer'; // Add a class for styling

        // Create the Like button
        const likeBtn = document.createElement('button');
        likeBtn.className = 'update';
        likeBtn.innerHTML = '+1 Like';
        likeBtn.style.float = 'right'; // Align the button to the left
        buttonDiv.appendChild(likeBtn);

        // Create the Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove';
        removeBtn.innerHTML = 'Remove';
        removeBtn.style.float = 'left'; // Align the button to the right
        buttonDiv.appendChild(removeBtn);

        // Append the new div containing the buttons after the trackItem div
        trackItem.insertAdjacentElement('afterend', buttonDiv);

        // Event listener for the Like button
        likeBtn.addEventListener('click', function () {
            // Increment likes count
            likesCount++;
            // Update the likes text content
            likesElement.textContent = `Likes: ${likesCount}`;

            console.log("Like Clicked");
            // Update likes count in Firestore
            updateLikes(songId, likesCount)
                .then(() => {
                    console.log('Likes updated successfully');
                    displaySong()
                })
                .catch((error) => {
                    console.error('Error updating likes: ', error);
                });
        });

        // Event listener for the Remove button
        removeBtn.addEventListener('click', function () {
            // Remove the trackItem and buttonDiv from the DOM
            // trackItem.remove();
            // buttonDiv.remove();
            // Remove song from Firestore
            removeSong(songId)
                .then(() => {
                    console.log('Song removed successfully from Firestore');
                    displaySong()
                })
                .catch((error) => {
                    console.error('Error removing song: ', error);
                });
        });

    })
}

document.addEventListener('DOMContentLoaded', function () {

    displaySong()

    document.getElementById('songBtn').addEventListener('click', addSong);
});
















