
import { React } from '../../chunk-e.js';
import { AbsoluteDiv } from './AbsoluteDiv.jsx';


export const ShadowDiv = ({ className, bounds, left, width }) => (
    <AbsoluteDiv
        className={className}
        bounds={bounds}
        left={left}
        top={bounds.padding + bounds.height - 2 * bounds.radius}
        width={width}
        height= {3 * bounds.radius}/>
);
