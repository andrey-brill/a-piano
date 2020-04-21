
import { resolveTone } from '../utils/Utils.js';


export class PianoTouches {

    constructor (piano) {

        this.piano = piano;
        this.activeTouches = new Set();

        // making possible to call preventDefault() on touch events
        document.body.style.touchAction = 'manipulation';

        window.addEventListener('touchstart', this.onTouchStart);
        window.addEventListener('touchmove', this.onTouchMove);
        window.addEventListener('touchend', this.onTouchEnd);

    }

    onTouchMove = (e) => {

        e.preventDefault();

        for (let { identifier, clientX, clientY } of e.changedTouches) {
            const realTarget = document.elementFromPoint(clientX, clientY);
            this.onTouch(identifier, realTarget);
        }
    }

    onTouchStart = (e) => {

        e.preventDefault();

        for (let { identifier, target } of e.touches) {
            this.onTouch(identifier, target);
        }
    }

    onTouch (identifier, target) {
        const tone = resolveTone(target);
        this.activeTouches.add(identifier);
        this.piano.attackTone(identifier, tone);
    }

    onTouchEnd = (e) => {

        e.preventDefault();

        const active = new Set();
        for (let touch of e.touches) {
            active.add(touch.identifier);
        }

        this.activeTouches.forEach( identifier => {
            if (!active.has(identifier)) {
                this.piano.releaseTone(identifier);
            }
        });

        this.activeTouches = active;
    }


}