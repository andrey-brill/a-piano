

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

export function calcNumberOfVisibleKeys (numberOfContentKeys, width, keyWidth) {
    const maxKeys = Math.floor(width / keyWidth);
    const difference = Math.max(0, maxKeys - numberOfContentKeys - VisibleKeysPadding);
    return numberOfContentKeys + (difference - difference % 2);
}


export function createSizes (isMobile, width, height, pRx, numberOfContentKeys) {

    const ContentWidthPw = KeyOuterWidthPw * numberOfContentKeys;
    let numberOfPossiblyVisibleKeys = numberOfContentKeys;

    // mobile first
    let pw = width / ContentWidthPw;
    let ph = (Math.min(height, width) - pw * UiVerticalPaddingPw) / UiHeightPh;

    if (!isMobile) {

        const isEnoughSpace = pRx * (ContentWidthPw + KeyOuterWidthPw * VisibleKeysPadding) <= width;

        if (isEnoughSpace) {
            numberOfPossiblyVisibleKeys = calcNumberOfVisibleKeys(numberOfContentKeys, width, KeyOuterWidthPw * pRx);
            pw = ph = width / ((numberOfPossiblyVisibleKeys + VisibleKeysPadding) * KeyOuterWidthPw);
        } else {
            ph = pw; // for big screen saving aspect ratio
        }
    }

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

        const octaveOuterHeight = ph(KeyHeightPh) + pw(VerticalPaddingPw);
        const pianoKeysOuterHeight = ph(WhiteKeyHeightPh) + pw(VerticalPaddingPw);

        const whiteKeyHeight = ph(WhiteKeyHeightPh);
        const k = WhiteKeyCutoutHeightPh / WhiteKeyHeightPh;
        const cutoutHeight = whiteKeyHeight * k;
        const unCutoutHeight = whiteKeyHeight - cutoutHeight;

        const keyWidth = pw(KeyWidthPw);
        const keyOuterWidth = pw(KeyOuterWidthPw);

        const leftOffsets = {};
        for (let key in BlackKeyOffsetFromWhiteKey) {
            leftOffsets[key] = BlackKeyOffsetFromWhiteKey[key] * keyWidth / KeyWidthPw
        }
        const blackTopHeight = ph(BlackKeyHeightPh) * BlackKeyTopHeightPh / BlackKeyHeightPh;

        const whiteCutoutWidths = {};
        for (let key in WhiteCutoutWidths) {
            const [ left, right ] = WhiteCutoutWidths[key];
            whiteCutoutWidths[key] = [left * keyWidth / KeyWidthPw, right * keyWidth / KeyWidthPw];
        }

        Object.assign(this, {

            keyWidth,
            keyOuterWidth,
            keyBounds: keyBounds(),

            octaveOuterHeight,
            octaveBounds: keyBounds({
                fontSize: ph(OctaveFontSizePh)
            }),

            pianoOuterSize: {
                width: pw(numberOfPossiblyVisibleKeys * KeyOuterWidthPw),
                height: pianoKeysOuterHeight + octaveOuterHeight
            },

            whiteKeyBounds: keyBounds({
                height: whiteKeyHeight,
                cutoutHeight,
                unCutoutHeight,
                cutoutWidths: whiteCutoutWidths
            }),

            blackKeyBounds: keyBounds({
                width: pw(BlackKeyWidthPw),
                height: ph(BlackKeyHeightPh),
                topHeight: blackTopHeight,
                whiteKeyOuterWidth: keyOuterWidth,
                leftOffsets
            })
        });

    }




}