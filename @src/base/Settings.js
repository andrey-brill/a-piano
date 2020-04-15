
import { IsMobile, PixelWidth, PixelHeight, FromKey, DefFromKey, ToKey, DefToKey, MinNumberOfContentKeys, KeyOuterWidth, NumberOfWhiteNotes, PianoHeight } from './Constants.js';
import { Changeable } from './Changeable.js';


const DefaultSettings = {

    // app settings
    [IsMobile]: null,
    [PixelWidth]: null,
    [PixelHeight]: null,

    // user settings
    [FromKey]: DefFromKey,
    [ToKey]: DefToKey
};

export class Settings extends Changeable {

    constructor () {
        super(DefaultSettings);
    }

    getNumberOfContentKeys () {
        return Math.max(MinNumberOfContentKeys, this.get(ToKey) - this.get(FromKey) + 1);
    }

    getContentWidth () {
        return KeyOuterWidth * this.getNumberOfContentKeys()
    }

    pw (value) {
        return value * this.get(PixelWidth);
    }

    ph (value) {
        return value * this.get(PixelHeight);
    }

    pwContentWidth () {
        return this.pw(this.getContentWidth());
    }

    pwPianoOffset () {
        return this.ph(- this.get(FromKey) * KeyOuterWidth);
    }

    pwPianoSize () {
        return {
            width: this.pw(NumberOfWhiteNotes * KeyOuterWidth),
            height: this.pw(PianoHeight)
        }
    }
}