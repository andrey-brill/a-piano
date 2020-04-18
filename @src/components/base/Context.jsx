
import { React } from '../../chunk-e.js';
import { createContext } from '../../base/Context.js';


export const Context = React.createContext({});

export const ContextProvider = ({ children }) => (
    <Context.Provider value={createContext()}>
        { children }
    </Context.Provider>
);
