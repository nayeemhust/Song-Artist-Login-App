import { appendSongToFirebase, countLikes, deleteSong, getAllSong } from "./music-db.js";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
        })
        .catch((error) => {

        });
} else {
}
async function appendSong() {

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

    appendSongToFirebase(title, artist)
    displaySong()
}

async function displaySong() {
    let songs = await getAllSong()

    document.getElementById('musicList').innerHTML = ''
    songs.forEach(({ Title: title, Artist: artist, Likes: likes, id: songId }) => {
        let docId;
        docId = songId;
        const trackList = document.getElementById('musicList');
        const trackItem = document.createElement('div');
        trackItem.className = 'songList';
        trackItem.style.position = 'relative';
        trackItem.style.width = '270px';
        trackItem.style.height = '20px';

        const titleElement = document.createElement('div');
        titleElement.innerHTML = `<strong>${title}</strong>`;
        titleElement.style.position = 'absolute';
        titleElement.style.left = '0';
        titleElement.style.top = '0';

        const artistElement = document.createElement('div');
        artistElement.textContent = artist;
        artistElement.style.position = 'absolute';
        artistElement.style.left = '0';
        artistElement.style.bottom = '0';

        const likesSpan = document.createElement('span');
        let likesCount = likes;
        likesSpan.textContent = `Likes: ${likesCount}`;
        likesSpan.style.position = 'absolute';
        likesSpan.style.right = '0';
        likesSpan.style.bottom = '0';

        trackItem.appendChild(titleElement);
        trackItem.appendChild(artistElement);
        trackItem.appendChild(likesSpan);

        trackList.appendChild(trackItem);

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'buttonContainer';

        const likeBtn = document.createElement('button');
        likeBtn.className = 'update';
        likeBtn.innerHTML = '+1 Like';
        likeBtn.style.float = 'right';
        buttonDiv.appendChild(likeBtn);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove';
        removeBtn.innerHTML = 'Remove';
        removeBtn.style.float = 'left';
        buttonDiv.appendChild(removeBtn);

        trackItem.insertAdjacentElement('afterend', buttonDiv);
        likeBtn.addEventListener('click', function () {
            likesCount++;
            likesSpan.textContent = `Likes: ${likesCount}`;
            countLikes(songId, likesCount)
                .then(() => {
                    displaySong()
                })
                .catch((error) => {
                });
        });
        removeBtn.addEventListener('click', function () {
            deleteSong(songId)
                .then(() => {
                    displaySong()
                })
                .catch((error) => {
                });
        });
    })
}
document.addEventListener('DOMContentLoaded', function () {
    displaySong()
    document.getElementById('songBtn').addEventListener('click', appendSong);
});