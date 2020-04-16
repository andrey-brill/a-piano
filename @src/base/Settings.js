
import { IsMobile, PixelWidth, PixelHeight, FromKey, KeyC3Index, ToKey, KeyB4Index, MinNumberOfContentKeys, KeyOuterWidth, NumberOfWhiteNotes, PianoHeight, CornerRadius, Padding, KeyOuterHeight, WhiteKeyHeight, KeyWidth, OctaveOuterHeight, KeyHeight, BlackKeyHeight, BlackKeyWidth, OctaveHeight } from './Constants.js';
import { Changeable } from './Changeable.js';


const DefaultSettings = {

    // app settings
    [IsMobile]: null,
    [PixelWidth]: null,
    [PixelHeight]: null,

    // user settings
    [FromKey]: null,
    [ToKey]: KeyB4Index
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

    pwKeyOuterWidth () {
        return this.pw(KeyOuterWidth)
    }

    pwContentWidth () {
        return this.pw(this.getContentWidth());
    }

    pwPianoOffset () {
        return - this.get(FromKey) * this.pwKeyOuterWidth();
    }

    phOctaveOuterHeight () {
        return this.ph(OctaveOuterHeight);
    }

    pwPianoSize () {
        return {
            width: this.pw(NumberOfWhiteNotes * KeyOuterWidth),
            height: this.ph(PianoHeight)
        }
    }

    pxKeyCommons (options) {
        return Object.assign({
            radius : this.pw(CornerRadius), // must be the same for x and y
            padding: this.pw(Padding), // must be the same for x and y
            width: this.pw(KeyWidth),
            height: this.ph(KeyHeight)
        }, options)
    }

    pxWhiteKeyBounds () {
        return this.pxKeyCommons({
            height: this.ph(WhiteKeyHeight)
        });
    }

    pxBlackKeyBounds () {
        return this.pxKeyCommons({
            width: this.pw(BlackKeyWidth),
            height: this.ph(BlackKeyHeight),
        });
    }

    pxOctaveBounds () {
        return this.pxKeyCommons({
            width: null, // width will be calculated based on keyWidth
            keyWidth: this.pw(KeyWidth),
            height: this.ph(OctaveHeight)
        });
    }
}