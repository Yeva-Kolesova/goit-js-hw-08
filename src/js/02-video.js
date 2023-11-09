import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

player.setCurrentTime(load('videoplayer-current-time')).then(function (seconds) {
}).catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            break;

        default:
            break;
    }
});

function onTimeUpdate(data) {
    save("videoplayer-current-time", data.seconds);
    console.log(data.seconds)
}


function save(key, value) {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
};

function load(key) {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};
