

const MOUSE_ID = 'mouse';

export class PianoMouse {

    constructor (piano) {

        this.piano = piano;
        this.mouseDown = false;
        this.currentTone = null;

        window.addEventListener('mouseup', this.onUp);
        window.addEventListener('mousedown', this.onDown);

        this.listeners = {
            onMouseLeave: this.onLeave,
            onMouseEnter: this.onEnter
        }
    }

    onLeave = () => {
        this.release();
        this.currentTone = null;
    }

    onEnter = (e) => {

        this.currentTone = e.currentTarget.getAttribute('name');

        if (this.mouseDown) {
            this.attack();
        }
    }

    onUp = () => {
        this.mouseDown = false;
        this.release();
    }

    attack () {
        this.piano.attackTone(MOUSE_ID, this.currentTone);
    }

    release () {
        this.piano.releaseTone(MOUSE_ID);
    }

    onDown = (e) => {
        if (e.button === 0) {
            this.mouseDown = true;
            this.attack();
        }
    }

}