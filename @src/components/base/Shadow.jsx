
import { React } from '../../chunk-e.js';
import { AbsoluteDiv } from './AbsoluteDiv.jsx';


export const ShadowRect = ({ className, offset, bounds }) => (
    <rect
        className={className}
        x={offset.x + bounds.padding}
        y={offset.y + bounds.padding + bounds.height - 2 * bounds.radius}
        width={bounds.width}
        height={3 * bounds.radius}
        rx={bounds.radius}/>
);

export const ShadowDiv = ({ className, bounds, left, width }) => (
    <AbsoluteDiv
        className={className}
        bounds={bounds}
        left={left}
        top={bounds.padding + bounds.height - 2 * bounds.radius}
        width={width}
        height= {3 * bounds.radius}/>
);
