
import { React } from '../../chunk-e.js';
import { KeyWidth, CornerRadius, WhiteKeyHeight, WhiteKeyCutoutHeight, Padding, KeyOuterWidth } from '../../base/Constants.js';



export const WhiteKey = ({ index = 0, type }) => {

    const offsetX = index * KeyOuterWidth;
    const shadowX = offsetX + Padding;
    const shadowY = Padding + WhiteKeyHeight - CornerRadius;

    // make <KeyState pressed={}><KeyNote/>
    // try use one .m.scss file for sharing css classes (.white-key .white-key-shadow)
    return (
        <g className='key-white'>
            <rect fill="#888" x={shadowX} y={shadowY} width={KeyWidth} height={2 * CornerRadius} rx={CornerRadius}/>
            <path fill="#fff" d={createWhiteKeyPathData(offsetX, type, WhiteKeyHeight)}/>
        </g>
    );
};



function createWhiteKeyPathData (offsetX, type, targetOuterHeight) {

    const { left, right } = resolveCutoutMargin(type);
    const upperWidth = KeyWidth - left - right;

    const k = WhiteKeyCutoutHeight / WhiteKeyHeight;
    const cutOutHeight = Math.round(targetOuterHeight * k);

    const pathData = [
        `M${ offsetX + Padding },${ targetOuterHeight + Padding - CornerRadius }`,
        "a 2 2 0 0 0 2,2",
        "h" + (30 - 2 * 2),
        "a 2 2 0 0 0 2,-2",
        "v" + (-65 + 2 * 2),
        "a 2 2 0 0 0 -2,-2",
        "h" + (-10),
        "a 2 2 0 0 1 -2,-2",
        "v" + (-110 + 2 * 2),
        "a 2 2 0 0 0 -2,-2",
        "h" + (-12),
        "a 2 2 0 0 0 -2,2",
        "z"
    ];

    return pathData.join(' ');
}


function resolveCutoutMargin (type = 'L') {

    let left = 0, right = 0;

    // Left, inCenter, Right
    switch (type) {
        case '-':
            break;
        case 'L':
            right = 14;
            break;
        case 'C':
            left = right = 6;
            break;
        case 'R':
            left = 14;
            break;
        case 'CL':
            left = 6;
            right = 10;
            break;
        case 'CR':
            right = 6;
            left = 10;
            break;
        default:
            throw new Error('Unknown note type: ' + type);
    }

    return { left, right };
}

