
import { Tone } from '../chunk-e.js';


const silentAudio = 'data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'


export class Tones {

    constructor () {

        const mp3TonesArray = ["A0", "C1", "D#1", "F#1", "A1", "C2", "D#2", "F#2", "A2", "C3", "D#3", "F#3", "A3", "C4", "D#4", "F#4", "A4", "C5", "D#5", "F#5", "A5", "C6", "D#6", "F#6", "A6", "C7", "D#7", "F#7", "A7", "C8"];

        const tones = {};
        for (var tone of mp3TonesArray) {
            tones[tone] = 'c' + tone.replace('#', 's') + '.mp3';
        }
        this.tones = tones;

        this.triggerAttack = resumeContextOnTrigger((tone) => {
            this.piano.triggerAttack(tone);
        });

        this.triggerRelease = resumeContextOnTrigger((tone) => {
            this.piano.triggerRelease(tone);
        });
    }

    initialize (onload) {
        this.piano = new Tone.Sampler(this.tones, {
            "release" : 0.75,
            "curve": 'exponential',
            "baseUrl" : "./assets/audio/",
            onload
        }).toMaster();
    }

}


// hack to turn on sound on device
function resumeContextOnTrigger (fn) {

    return (tone) => {

        if (Tone.context.state === 'suspended') {

            const contextPromise = Tone.context.resume();

            // also play a silent audio file which will unmute iOS
            const audioElement = document.createElement('audio')
            audioElement.controls = false;
            audioElement.preload = 'auto';
            audioElement.loop = false;
            audioElement.src = silentAudio;
            audioElement.title = 'SilentAudio';

            let elementPromise = Promise.resolve();
            try {
                elementPromise = audioElement.play()
            } catch (e){
                elementPromise = Promise.resolve()
                console.log('did not start audio', e);
            }
            Promise
                .all([elementPromise, contextPromise])
                .then(function () {
                    fn(tone);
                });
        } else {
            fn(tone);
        }
    }
}
