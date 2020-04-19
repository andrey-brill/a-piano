
import { resolveTone } from '../utils/Utils.js';


const MOUSE_ID = 'mouse';

export class PianoMouse {

    constructor (piano) {

        this.piano = piano;
        this.mouseDown = false;
        this.currentTone = null;

        window.addEventListener('mousedown', this.onDown);
        window.addEventListener('mousemove', this.onMove);
        window.addEventListener('mouseup', this.onUp);

        // preventing mouse events in touch mode
        this.countTouches = 0;
        window.addEventListener('touchstart', this.onTouchStart);
        window.addEventListener('touchend', this.onTouchEnd)
    }

    onTouchStart = (e) => {
        this.countTouches = e.touches.length;
    }

    onTouchEnd = (e) => {
        const count = e.touches.length;
        setTimeout(() => { this.countTouches = count; }, 10);
    }

    onDown = (e) => {

        if (e.button === 0 && this.countTouches === 0) {
            this.mouseDown = true;
            this.attack();
        }
    }

    attack () {
        this.piano.attackTone(MOUSE_ID, this.currentTone);
    }

    onMove = (e) => {

        this.currentTone = resolveTone(e.target);

        if (this.mouseDown) {
            this.attack();
        }
    }


    onUp = () => {
        this.mouseDown = false;
        this.piano.releaseTone(MOUSE_ID);
    }


}