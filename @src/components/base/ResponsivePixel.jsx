
import { React, AResponsiveReact, AResponsiveContainers } from '../../chunk-e.js';
import { FromKey, IsMobile, PixelWidth, PixelHeight, PianoTotalHeight, KeyOuterWidth, ToKey } from '../../base/Constants.js';
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

        const { width, heigh, diagonal, pRx } = resolvedRo;

        const isMobile = AResponsiveContainers.isSmallScreen(diagonal);
        const ContentWidth = settings.getContentWidth();

        // mobile first
        let pw = width / ContentWidth, ph = heigh / PianoTotalHeight;

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