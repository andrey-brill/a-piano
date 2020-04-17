
import { React, AResponsiveReact, AResponsiveContainers } from '../../chunk-e.js';
import { ContentKeysInterval, Sizes, KeyC4Index, KeyC3Index, KeyB4Index, VisibleKeysInterval } from '../../base/Constants.js';
import { Context } from './Context.jsx';
import { KeysInterval } from '../../base/KeysInterval.js';
import { createSizes, calcNumberOfVisibleKeys } from '../../base/Sizes.js';


export const ResponsivePixel = React.memo(() => {

    const { settings } = React.useContext(Context);

    const ro = {
        width: '100w',
        height: '100h',
        diagonal: '100d',
        pRx: 0.25
    };

    let resolvedRo = undefined;

    function updateSize () {

        const { width, height, diagonal, pRx } = resolvedRo;

        const isMobile = AResponsiveContainers.isSmallScreen(diagonal);

        let contentKeysInterval = settings.get(ContentKeysInterval);

        if (contentKeysInterval === null) {
            const from = isMobile ? KeyC4Index : KeyC3Index;
            contentKeysInterval = settings.set(ContentKeysInterval, new KeysInterval(from, KeyB4Index));
        }

        const { from, to, length: numberOfContentKeys } = contentKeysInterval;

        const sizes = createSizes(isMobile, width, height, pRx, numberOfContentKeys);
        const numberOfVisibleKeys = calcNumberOfVisibleKeys(numberOfContentKeys, width, sizes.keyOuterWidth);
        const keysOffset = (numberOfVisibleKeys - numberOfContentKeys) / 2;
        const visibleKeysInterval = new KeysInterval(from - keysOffset, to + keysOffset);

        settings.set(VisibleKeysInterval, visibleKeysInterval, true);
        settings.set(Sizes, sizes);
    }

    function onResize (resolved) {
        resolvedRo = resolved;
        updateSize();
    }

    settings.onChange( function (setting) {
        if (resolvedRo && setting === ContentKeysInterval) {
            updateSize();
        }
    });

    return (<AResponsiveReact.ResponsiveListener roCreator={ro} roResize={onResize}/>);
});