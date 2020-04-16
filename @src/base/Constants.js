

const GridK = 30.0;


export const

    OctaveSize = 7,

    NumberOfNotes = 88,
    NumberOfWhiteNotes = 52,
    NumberOfBlackNotes = 36,

    GridPadding = 1,

    // from Tilde to BackspaceKey and from Tab to Enter for desktop
    // NumberOfKeyboardKeys = 14,

    // based on 88-keyboard (52 white + 36 black) to have C4 in the middle
    KeyC3Index = 2 + 2 * OctaveSize,
    KeyC4Index = KeyC3Index + OctaveSize,
    KeyB4Index = KeyC4Index + OctaveSize - 1,

    MinKey = 0, // A0 == 0
    MaxKey = NumberOfWhiteNotes - 1, // C8 == 51
    MinNumberOfContentKeys = OctaveSize + 1,

    IsMobile = 'IsMobile',

    PixelWidth = 'PixelWidth',
    PixelHeight = 'PixelHeight',

    // the next values in stretched pixels
    ShadowOffset = 2,
    CornerRadius = 2,

    Padding = 1,
    WidthPadding = 2 * Padding,
    HeightPadding = 2 * Padding + ShadowOffset,

    KeyWidth = 30,
    KeyOuterWidth = KeyWidth + WidthPadding,

    KeyHeight = 30,
    KeyOuterHeight = KeyHeight + HeightPadding,

    WhiteKeyHeight = 175,
    WhiteKeyCutoutHeight = 110,
    WhiteKeyOuterHeight = WhiteKeyHeight + HeightPadding,

    BlackKeyWidth = 18,
    BlackKeyHeight = 106,
    BlackKeyTopHeight = 94,

    OctaveHeight = KeyHeight,
    OctaveOuterHeight = KeyOuterHeight,

    OctaveFontSize = 13,

    PianoHeight = OctaveOuterHeight + WhiteKeyOuterHeight,
    ControlsHeight = KeyOuterHeight,
    PianoTotalHeight = PianoHeight + ControlsHeight

;


// Preferences keys
export const
    FromKey = 'FromKey',
    ToKey = 'ToKey'
;
