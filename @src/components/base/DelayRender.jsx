
import { React } from '../../chunk-e.js';


export const DelayRender = ({ delay = 0, children }) => {

    const [canRender, setCanRender] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setCanRender(true), delay);
        return () => clearTimeout(timer);
    }, []);

    if (canRender) {
        return (<>{ children }</>);
    }

    return (null);
};
