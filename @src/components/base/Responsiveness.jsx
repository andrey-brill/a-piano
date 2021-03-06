
import { React, AResponsiveReact, AResponsiveContainers } from '../../chunk-e.js';
import { ContentKeysInterval, Sizes, KeyC4Index, KeyC3Index, KeyB4Index, KeyC5Index, VisibleKeysInterval, IsMobile, NumberOfMinimumVisibleKeys, MinNumberOfContentKeys } from '../../base/Constants.js';
import { Context } from './Context.jsx';
import { KeysInterval } from '../../base/KeysInterval.js';
import { createSizes, createSizesOptions } from '../../base/Sizes.js';


const pianoRo = AResponsiveContainers.commonProperties({
    pWidth: '100w',
    pHeight: '100h',
    pDiagonal: '100d',
    pRx: 0.25,
    pLogoWidth: 80
});


export class Responsiveness extends React.Component {

    static contextType = Context;

    state = {
        prepared: false,
        initialized: false
    }

    render () {

        if (!this.state.prepared) {
            return (null);
        }

        return (
            <AResponsiveReact.ResponsiveWindow>
                <AResponsiveReact.ResponsiveElement roCreator={pianoRo} roResize={this.onResize}>
                    { this.state.initialized ? (this.props.children) : (null) }
                </AResponsiveReact.ResponsiveElement>
            </AResponsiveReact.ResponsiveWindow>
        );
    }

    componentDidMount () {

        const { settings } = this.context;

        const updateSize = (resolvedRo) => {

            const { pWidth, pHeight, pDiagonal, pRx } = resolvedRo;

            const isMobile = AResponsiveContainers.isSmallScreen(pDiagonal);

            let contentKeysInterval = settings.get(ContentKeysInterval);

            if (contentKeysInterval === null) {
                const from = isMobile ? KeyC4Index : KeyC3Index;
                const to = isMobile ? KeyC5Index : KeyB4Index;
                contentKeysInterval = settings.set(ContentKeysInterval, new KeysInterval(from, to), true);
            }

            const { from, to, length: numberOfContentKeys } = contentKeysInterval;

            const sizesOptions = createSizesOptions(isMobile, pWidth, pHeight, pRx, numberOfContentKeys);
            const minSizesOptions = createSizesOptions(isMobile, pWidth, pHeight, pRx, MinNumberOfContentKeys);

            const numberOfVisibleKeys = sizesOptions.numberOfVisibleKeys;
            const sizes = createSizes(sizesOptions);

            const keysOffset = (numberOfVisibleKeys - numberOfContentKeys) / 2;
            const visibleKeysInterval = new KeysInterval(from - keysOffset, to + keysOffset);

            if (isMobile) {
                settings.set(ContentKeysInterval, visibleKeysInterval, true);
            }

            settings.set(NumberOfMinimumVisibleKeys, minSizesOptions.numberOfVisibleKeys);
            settings.set(IsMobile, isMobile);
            settings.set(VisibleKeysInterval, visibleKeysInterval);
            settings.set(Sizes, sizes);

            this.setState({ initialized: true });

            for (let paddingKey in sizes.paddings) {
                resolvedRo['pPadding' + paddingKey] = sizes.paddings[paddingKey];
            }

        }

        this.onResize = (resolved) => {
            this.resolvedRo = resolved;
            updateSize(this.resolvedRo);
        }

        settings.onChange( setting => {
            if (this.resolvedRo && setting === ContentKeysInterval) {
                updateSize(this.resolvedRo);
            }
        });

        this.setState({ prepared: true });
    }
}
