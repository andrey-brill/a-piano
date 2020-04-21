

export const

    OctaveSize = 7,

    NumberOfNotes = 88,
    NumberOfWhiteNotes = 52,
    NumberOfBlackNotes = 36,

    // from Tilde to BackspaceKey and from Tab to Enter for desktop
    // NumberOfKeyboardKeys = 14,

    // based on 88-keyboard (52 white + 36 black) to have C4 in the middle
    KeyC3Index = 2 + 2 * OctaveSize,
    KeyC4Index = KeyC3Index + OctaveSize,
    KeyC5Index = KeyC4Index + OctaveSize,
    KeyB4Index = KeyC5Index - 1,

    MinKey = 0, // A0 == 0
    MaxKey = NumberOfWhiteNotes - 1, // C8 == 51
    MinNumberOfContentKeys = OctaveSize + 1,

    ToneReleased = 0,
    ToneAttacked = 1,
    ToneNotReleased = 2, // during SoftPedal

    TouchableKey = 'touchable-key',
    Name = 'name'
;

// App settings
export const
    IsMobile = 'IsMobile',
    Sizes = 'Sizes',
    VisibleKeysInterval = 'VisibleKeysInterval',
    NumberOfMinimumVisibleKeys = 'NumberOfMinimumVisibleKeys'
;

// User settings
export const
    ContentKeysInterval = 'ContentKeysInterval'
;


// ControlKeys
export const
    Pedal = 'Pedal',
    Expand = 'Expand',
    Shrink = 'Shrink',
    ShiftLeft = 'ShiftLeft',
    ShiftRight = 'ShiftRight',
    IntervalActions = [Expand, Shrink, ShiftLeft, ShiftRight];
