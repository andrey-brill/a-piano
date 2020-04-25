
import { resolveKeyName } from '../utils/Utils.js';


const MOUSE_ID = 'mouse';

export class PianoMouse {

    constructor (piano) {

        this.piano = piano;
        this.mouseDown = false;
        this.currentKey = null;

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
        this.piano.attackKey(MOUSE_ID, this.currentKey);
    }

    onMove = (e) => {

        this.currentKey = resolveKeyName(e.target);

        if (this.mouseDown) {
            this.attack();
        }
    }


    onUp = () => {
        this.mouseDown = false;
        this.piano.releaseKey(MOUSE_ID);
    }


}