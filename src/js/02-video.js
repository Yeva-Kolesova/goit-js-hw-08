import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

const playbackTime = localStorage.getItem("videoplayer-current-time")

player.setCurrentTime(playbackTime).then(function (seconds) {
}).catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            break;

        default:
            break;
    }
});
function onTimeUpdate(data) {
    console.log(data.seconds);
}