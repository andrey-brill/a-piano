
import { React } from '../../chunk-e.js';
import { Context } from './Context.jsx';

import style from './TonesLoader.m.scss';


export class TonesLoader extends React.Component {

    static contextType = Context;

    state = {
        loaded: false,
    }

    render () {

        if (!this.state.loaded) {
            return (
                <div className={style.container}>
                    <div className={style.loading}>
                        { [1,2,3].map ( i => <div key={i} className={style.circleContainer}><div className={style.circle}/></div> ) }
                    </div>
                </div>
            );
        }

        return (<div className={style.content}>{ this.props.children }</div>);
    }

    componentDidMount () {

        const { tones } = this.context;

        tones.initialize(() => {
            setTimeout(() => this.setState({ loaded: true }), 1000);
        });
    }
}
