
import { React } from '../../chunk-e.js';
import { nvlNumber } from '../../utils/Utils.js';


const DefaultBounds = {
    padding: 0,
    radius: 0
}

export const AbsoluteDiv = ({ className, name, title, left, top, width, height, radius, children, bounds=DefaultBounds }) => (

    <div
        className={className}
        name={name}
        title={title}
        style={{
            position: 'absolute',
            left: nvlNumber(left, bounds.padding),
            top: nvlNumber(top, bounds.padding),
            width: nvlNumber(width, bounds.width),
            height: nvlNumber(height, bounds.height),
            borderRadius: nvlNumber(radius, bounds.radius)
        }}>

        {children}

    </div>
);
