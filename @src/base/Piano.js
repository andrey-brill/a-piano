
import { ToneAttacked, ToneReleased, ToneNotReleased } from './Constants.js';


export class Piano {

    constructor (tones, notes) {

        this.notes = notes
        this.tones = tones;

        this.states = {};

        this.soft = false;

        this.controllers = {};
    }

    attackTone (controllerId, tone) {

        if (controllerId === null || controllerId === undefined) {
            throw new Error('ControllerId is undefined');
        }

        const currentTone = this.controllers[controllerId];
        if (currentTone && currentTone !== tone) {
            this.triggerRelease(currentTone);
        }

        if (tone) {
            this.controllers[controllerId] = tone;
            this.triggerAttack(tone);
        } else if (currentTone) {
            delete this.controllers[controllerId];
        }

    }

    releaseTone (controllerId) {
        this.attackTone(controllerId, null);
    }

    pedalAttack () {
        this.soft = true;
    }

    pedalRelease () {

        this.soft = false;

        for (let key in this.states) {
            const state = this.states[key];
            if (state === ToneNotReleased) {
                this.triggerRelease(key);
            }
        }

    }

    triggerAttack (tone) {

        if (this.states[tone] === ToneAttacked) {
            return;
        }

        this.states[tone] = ToneAttacked;
        this.tones.triggerAttack(tone);

        this.notes.pressed(tone, true);
    }


    triggerRelease (tone) {

        const nextState = this.soft ? ToneNotReleased : ToneReleased;
        if (this.states[tone] === nextState) {
            return;
        }

        if (this.soft) {
            this.states[tone] = ToneNotReleased;
        } else {
            this.states[tone] = ToneReleased;
            this.tones.triggerRelease(tone);
        }

        this.notes.pressed(tone, false);
    }

}