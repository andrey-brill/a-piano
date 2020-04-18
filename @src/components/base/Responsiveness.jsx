
import { React, AResponsiveReact, AResponsiveContainers } from '../../chunk-e.js';
import { ContentKeysInterval, Sizes, KeyC4Index, KeyC3Index, KeyB4Index, VisibleKeysInterval } from '../../base/Constants.js';
import { Context } from './Context.jsx';
import { KeysInterval } from '../../base/KeysInterval.js';
import { createSizes, calcNumberOfVisibleKeys } from '../../base/Sizes.js';


const pianoRo = AResponsiveContainers.commonProperties({
    pWidth: '100w',
    pHeight: '100h',
    pDiagonal: '100d',
    pRx: 0.25
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
                contentKeysInterval = settings.set(ContentKeysInterval, new KeysInterval(from, KeyB4Index));
            }

            const { from, to, length: numberOfContentKeys } = contentKeysInterval;

            const sizes = createSizes(isMobile, pWidth, pHeight, pRx, numberOfContentKeys);
            const numberOfVisibleKeys = calcNumberOfVisibleKeys(numberOfContentKeys, pWidth, sizes.keyOuterWidth);
            const keysOffset = (numberOfVisibleKeys - numberOfContentKeys) / 2;
            const visibleKeysInterval = new KeysInterval(from - keysOffset, to + keysOffset);

            settings.set(VisibleKeysInterval, visibleKeysInterval, true);
            settings.set(Sizes, sizes);

            this.setState({ initialized: true });

            for (let paddingKey in sizes.paddings) {
                resolvedRo['pPadding' + paddingKey] = sizes.paddings[paddingKey];
            }

            if (!isNaN(resolvedRo.pDiagonal)) {
                resolvedRo.pDiagonal = resolvedRo.pDiagonal + 'in';
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
