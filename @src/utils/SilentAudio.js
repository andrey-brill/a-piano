


const Src = 'data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'

/*
    Play a silent audio file for:
        - unmute iOS
        - reduce delay on playing sounds with wireless output
 */

export class SilentAudio {

    constructor () {
        const audioElement = document.createElement('audio')
        audioElement.controls = false;
        audioElement.preload = 'auto';
        audioElement.loop = true;
        audioElement.src = Src;
        audioElement.title = 'SilentAudio';
        audioElement.style.opacity = 0;
        this.audioElement = audioElement;
    }

    appendTo (parent) {
        parent.appendChild(this.audioElement);
    }

    tryToPlay () {

        if (!this.audioElement.paused) {
            return;
        }

        try {
            this.audioElement.play().catch(this.onSilentAudioFails);
        } catch (e) {
            this.onSilentAudioFails(e);
        }
    }

    onPlayFail (e) {
        console.log('Can not play silent audio: ' + e);
    }

}