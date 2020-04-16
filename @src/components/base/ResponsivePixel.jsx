
import { React, AResponsiveReact, AResponsiveContainers } from '../../chunk-e.js';
import { FromKey, IsMobile, PixelWidth, PixelHeight, PianoTotalHeight, ToKey, KeyC4Index, KeyC3Index } from '../../base/Constants.js';
import { Context } from './Context.jsx';


export const ResponsivePixel = React.memo(() => {

    const { settings } = React.useContext(Context);

    const ro = {
        width: '100w',
        height: '100h',
        diagonal: '100d',
        pRx: 0.25
    };

    let resolvedRo = {};

    function updateSize () {

        const { width, height, diagonal, pRx } = resolvedRo;

        const isMobile = AResponsiveContainers.isSmallScreen(diagonal);
        if (settings.isNull(FromKey)) {
            console.log('here');
            settings.set(FromKey, isMobile ? KeyC4Index : KeyC3Index);
        }

        const ContentWidth = settings.getContentWidth();

        // mobile first
        let pw = width / ContentWidth, ph = Math.min(height, width) / PianoTotalHeight;

        if (!isMobile) {
            if (pRx * ContentWidth <= width) {
                pw = ph = pRx;
            } else {
                ph = pw; // for big screen saving aspect ratio
            }
        }

        settings.setAll({
            [IsMobile]: isMobile,
            [PixelWidth]: pw,
            [PixelHeight]: ph
        });

        console.log(isMobile, pw, ph);
    }

    function onResize (resolved) {
        resolvedRo = resolved;
        updateSize();
    }

    settings.onChange( function (setting) {
        if (setting === FromKey || setting === ToKey) {
            updateSize();
        }
    });

    return (<AResponsiveReact.ResponsiveListener roCreator={ro} roResize={onResize}/>);
});