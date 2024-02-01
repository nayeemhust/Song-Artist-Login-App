document.addEventListener('DOMContentLoaded', function () {
    function displaySong() {
        const title = document.getElementById('Title');
        const artist = document.getElementById('Artist');
        const errormsg = document.getElementById('errormsg');
        if (!title.value.trim() && !artist.value.trim()) {
            errormsg.textContent = 'Title and Artist name of the song both are required.';
            return;
        }
        if (title.value === '') {
            errormsg.textContent = 'Title of the song is required.';
            return;
        }
        if (artist.value === '') {
            errormsg.textContent = 'Artist name of the song is required.';
            return;
        }
        errormsg.textContent = '';
        const trackList = document.getElementById('musicList');
        const trackItem = document.createElement('div');
        trackItem.className = 'songList';
        trackItem.innerHTML = `<strong>${title.value}</strong> by <strong>${artist.value}</strong>`;
        trackList.appendChild(trackItem);
        title.value = '';
        artist.value = '';
    }
    document.getElementById('songBtn').addEventListener('click', displaySong);
});
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
console.log('Register Success:', registration);
    })
    .catch((error) => {
        console.log('Register Failed:', error);

    })
}
else {
    console.log('Service workers are not supported')
}

