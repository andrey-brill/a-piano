
import { ToneAttacked, ToneReleased, ToneNotReleased } from './Constants.js';


export class Piano {

    constructor (tones, notes, controlKeys) {

        this.notes = notes
        this.tones = tones;
        this.controlKeys = controlKeys;

        this.states = {};

        this.soft = false;

        this.controllers = {};
    }

    attackKey (controllerId, key) {

        if (controllerId === null || controllerId === undefined) {
            throw new Error('ControllerId is undefined');
        }


        const currentKey = this.controllers[controllerId];
        if (currentKey && currentKey !== key) {
            if (this.controlKeys.has(currentKey)) {
                this.controlKeys.pressed(currentKey, false);
            } else {
                this.triggerRelease(currentKey);
            }
        }

        if (key) {
            this.controllers[controllerId] = key;
            if (this.controlKeys.has(key)) {
                this.controlKeys.pressed(key, true);
            } else {
                this.triggerAttack(key);
            }
        } else if (currentKey) {
            delete this.controllers[controllerId];
        }

    }

    releaseKey (controllerId) {
        this.attackKey(controllerId, null);
    }

    togglePedal (soft) {
        if (soft) {
            this.pedalAttack();
        } else {
            this.pedalRelease();
        }
    }

    pedalAttack () {
        this.soft = true;
    }

    pedalRelease () {

        if (!this.soft) {
            return;
        }

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