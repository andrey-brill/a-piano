
import { ShiftLeft, ShiftRight, Expand, Shrink, ContentKeysInterval, IntervalActions, NumberOfMinimumVisibleKeys } from './Constants.js'


const KeyCodesMappings = {
    NumpadAdd: Expand,
    NumpadSubtract: Shrink,
    ArrowLeft: ShiftLeft,
    ArrowRight: ShiftRight
}

export class PianoControls {

    constructor (piano, controlKeys, settings) {

        this.piano = piano;
        this.controlKeys = controlKeys;
        this.settings = settings;

        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);

        this.intervalActions = new Set(IntervalActions);
        this.controlKeys.onChange(this.onPressed);

        this.settings.onChange(this.onSettingsChange);
    }

    onSettingsChange = () => {

        const contentKeysInterval = this.settings.get(ContentKeysInterval);
        const numberOfMinimumVisibleKeys = this.settings.get(NumberOfMinimumVisibleKeys);

        this.controlKeys.forEach( control => {
            if (control.intervalAction) {
                let disabled = !contentKeysInterval.can(control.intervalAction);
                if (control.name === Shrink && !disabled) {
                    disabled = contentKeysInterval.length <= numberOfMinimumVisibleKeys;
                }
                this.controlKeys.disabled(control.name, disabled);
            }
        })

    }

    onKeyDown = (e) => {

        if (e.shiftKey) {
            this.piano.pedalAttack();
        }

        const key = KeyCodesMappings[e.code];
        if (key) {
            this.controlKeys.pressed(key, true);
        }

    }

    onPressed = (name, key) => {

        if (!this.intervalActions.has(name)) {
            return
        }

        const { pressed, disabled, intervalAction } = key;
        if (pressed && !disabled) {
            const interval = this.settings.get(ContentKeysInterval);
            const newInterval = interval.run(intervalAction);
            if (newInterval) {
                this.settings.set(ContentKeysInterval, newInterval);
            }
        }

    }

    onKeyUp = (e) => {

        if (!e.shiftKey) {
            this.piano.pedalRelease();
        }

        const key = KeyCodesMappings[e.code];
        if (key) {
            this.controlKeys.pressed(key, false);
        }

    }
}