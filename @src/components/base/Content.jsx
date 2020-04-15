
import { React } from '../../chunk-e.js';
import { FromKey, ToKey, PixelWidth } from '../../base/Constants.js';
import { Context } from './Context.jsx';

import style from './Content.m.scss';


export const Content = ({ children }) => {

    const { settings } = React.useContext(Context);

    const [ width, setWidth ] = React.useState(settings.pwContentWidth());

    React.useEffect(() => settings.onChange((key) => {
        if (key === FromKey || key === ToKey || key === PixelWidth) setWidth(settings.pwContentWidth());
    }), []);

    return (
        <div className={style.content} style={{ width: width, maxWidth: width, minWidth: width }}>
            { children }
        </div>
    )
};