
// VoiceRSS Javascript SDK

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to voiceRSSA API

function tellMe(joke) {
     console.log('tell me:', joke);
     VoiceRSS.speech({
        key: '3ec70864256548acb47fef744d284814',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo', 
        ssml: false
    });
}

// Get Jokes from API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json(); 
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        } 

        //Text to Speech 
        tellMe(joke);

        // Disable button  
        toggleButton();

    } catch (error) {
        // catch errors here
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended', toggleButton);
