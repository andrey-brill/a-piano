

const

    // Padding & Radius should have aspect 1 : 1
    PaddingPw = 1,

    ShadowOffsetPw = 2 * PaddingPw,
    RadiusPw = 2 * PaddingPw,

    HorizontalPaddingPw = 2 * PaddingPw,
    VerticalPaddingPw = 2 * PaddingPw + ShadowOffsetPw,

    KeyWidthPw = 30,
    KeyOuterWidthPw = KeyWidthPw + HorizontalPaddingPw,

    KeyHeightPh = 30,

    WhiteKeyHeightPh = 175,
    WhiteKeyCutoutHeightPh = 110,

    BlackKeyWidthPw = 18,
    BlackKeyHeightPh = 106,
    BlackKeyTopHeightPh = 92,

    OctaveFontSizePh = 13,

    OctaveHeightPh = KeyHeightPh,
    ControlsHeightPh = KeyHeightPh,

    UiHeightPh = ControlsHeightPh + OctaveHeightPh + WhiteKeyHeightPh,
    UiVerticalPaddingPw = 3 * VerticalPaddingPw,

    KeyboardKeyFontSizePh = 8,

    BlackKeyOffsetFromWhiteKey = {
        C: 18,
        D: 26,
        F: 18,
        G: 22,
        A: 26
    },

    WhiteCutoutWidths = {
        C: [0, 14],
        D: [6, 6],
        E: [14, 0],
        F: [0, 14],
        G: [6, 10],
        A: [10, 6],
        B: [14, 0]
    }

;

const VisibleKeysPadding = 2;

export function calcNumberOfVisibleKeys (isMobile, numberOfContentKeys, width, keyOuterWidth) {
    const maxKeys = Math.floor(width / keyOuterWidth);
    const difference = Math.max(0, maxKeys - numberOfContentKeys - (isMobile ? 0 : VisibleKeysPadding));
    return numberOfContentKeys + (difference - difference % 2);
}

export function createSizesOptions (isMobile, width, height, pRx, numberOfContentKeys) {

    const ContentWidthPw = KeyOuterWidthPw * numberOfContentKeys;

    let pw, ph, numberOfPossiblyVisibleKeys;

    if (isMobile) {

        pw = width / ContentWidthPw;
        ph = (Math.min(height, width) - pw * UiVerticalPaddingPw) / UiHeightPh;
        pw = Math.min(pw, ph);

        numberOfPossiblyVisibleKeys = calcNumberOfVisibleKeys(isMobile, numberOfContentKeys, width, KeyOuterWidthPw * pw);
        pw = width / (numberOfPossiblyVisibleKeys * KeyOuterWidthPw); // making full width

    } else {

        const isEnoughSpace = pRx * (ContentWidthPw + KeyOuterWidthPw * VisibleKeysPadding) <= width;

        if (isEnoughSpace) {
            numberOfPossiblyVisibleKeys = calcNumberOfVisibleKeys(isMobile, numberOfContentKeys, width, KeyOuterWidthPw * pRx);
            pw = ph = width / ((numberOfPossiblyVisibleKeys + VisibleKeysPadding) * KeyOuterWidthPw);
        } else {
            numberOfPossiblyVisibleKeys = numberOfContentKeys;
            ph = pw = width / ContentWidthPw; // for big screen saving aspect ratio
        }
    }

    const keyOuterWidth = pw * KeyOuterWidthPw;

    return {
        pw,
        ph,
        keyOuterWidth,
        numberOfPossiblyVisibleKeys,
        numberOfVisibleKeys: calcNumberOfVisibleKeys(isMobile, numberOfContentKeys, width, keyOuterWidth)
    }
}

export function createSizes ({ pw, ph, numberOfPossiblyVisibleKeys }) {

    function fpw (value) {
        return value * pw;
    }

    function fph (value) {
        return value * ph;
    }

    return new Sizes(numberOfPossiblyVisibleKeys, fpw, fph);
}

class Sizes {

    constructor (numberOfPossiblyVisibleKeys, pw, ph) {

        function keyBounds (options = {}) {
            return Object.assign({
                radius : pw(RadiusPw),
                padding: pw(PaddingPw),
                width: pw(KeyWidthPw),
                height: ph(KeyHeightPh)
            }, options)
        }

        const whiteKeyHeight = ph(WhiteKeyHeightPh);
        const k = WhiteKeyCutoutHeightPh / WhiteKeyHeightPh;
        const cutoutHeight = whiteKeyHeight * k;
        const unCutoutHeight = whiteKeyHeight - cutoutHeight;

        const keyWidth = pw(KeyWidthPw);
        const keyOuterWidth = pw(KeyOuterWidthPw);
        const keyOuterHeight = ph(KeyHeightPh) + pw(VerticalPaddingPw);

        const leftOffsets = {};
        for (let key in BlackKeyOffsetFromWhiteKey) {
            leftOffsets[key] = BlackKeyOffsetFromWhiteKey[key] * keyWidth / KeyWidthPw
        }

        const whiteCutoutWidths = {};
        for (let key in WhiteCutoutWidths) {
            const [ left, right ] = WhiteCutoutWidths[key];
            whiteCutoutWidths[key] = [left * keyWidth / KeyWidthPw, right * keyWidth / KeyWidthPw];
        }

        const whiteKeyOuterHeight = ph(WhiteKeyHeightPh) + pw(VerticalPaddingPw);

        Object.assign(this, {

            keyWidth,
            keyOuterWidth,
            keyOuterHeight,

            keyboardKeyBounds: keyBounds({
                outerWidth: keyOuterWidth,
                fontSize: ph(KeyboardKeyFontSizePh)
            }),

            paddings: {
                X1: pw(PaddingPw),
                X2: 2 * pw(PaddingPw),
                X4: 4 * pw(PaddingPw)
            },

            octaveBounds: keyBounds({
                fontSize: ph(OctaveFontSizePh),
                outerHeight: keyOuterHeight
            }),

            pianoOuterSize: {
                width: pw(numberOfPossiblyVisibleKeys * KeyOuterWidthPw),
                height: whiteKeyOuterHeight
            },

            whiteKeyBounds: keyBounds({
                height: whiteKeyHeight,
                outerWidth: keyOuterWidth,
                outerHeight: whiteKeyOuterHeight,
                cutoutHeight,
                unCutoutHeight,
                cutoutWidths: whiteCutoutWidths
            }),

            blackKeyBounds: keyBounds({
                width: pw(BlackKeyWidthPw),
                height: ph(BlackKeyHeightPh),
                topHeight: ph(BlackKeyHeightPh) * BlackKeyTopHeightPh / BlackKeyHeightPh,
                whiteKeyOuterWidth: keyOuterWidth,
                leftOffsets
            })
        });

    }




}