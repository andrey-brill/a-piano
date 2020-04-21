
import { Tone } from '../chunk-e.js';
import { SilentAudio } from '../utils/SilentAudio.js';


export class Tones {

    constructor () {

        const mp3TonesArray = ["A0", "C1", "D#1", "F#1", "A1", "C2", "D#2", "F#2", "A2", "C3", "D#3", "F#3", "A3", "C4", "D#4", "F#4", "A4", "C5", "D#5", "F#5", "A5", "C6", "D#6", "F#6", "A6", "C7", "D#7", "F#7", "A7", "C8"];

        const tones = {};
        for (var tone of mp3TonesArray) {
            tones[tone] = 'c' + tone.replace('#', 's') + '.mp3';
        }
        this.tones = tones;

        this.audioElement = new SilentAudio();
    }

    initialize (onload) {

        this.audioElement.appendTo(document.body);

        this.piano = new Tone.Sampler(this.tones, {
            "attack": 0,
            "release" : 0.75,
            "curve": 'exponential',
            "baseUrl" : "./assets/audio/",
            onload
        }).toMaster();
    }

    triggerAttack = (tone) => {
        this.resumeContextOnTrigger('Attack', tone);
    }

    triggerRelease = (tone) => {
        this.resumeContextOnTrigger('Release', tone);
    }

    resumeContextOnTrigger (trigger, tone) {

        this.audioElement.tryToPlay();

        if (!this.piano.loaded) {
            return;
        }

        if (Tone.context.state !== 'suspended') {
            (this.piano['trigger' + trigger])(tone);
        } else {
            Tone.context.resume().then(() => {
                this.resumeContextOnTrigger(trigger, tone);
            });
        }
    }
}



