

export class Changeable {

    constructor (state) {

        this.state = Object.assign({}, state);

        this.listeners = [];
    }

    get (property) {
        const value = this.state[property];
        if (value === undefined) {
            throw new Error('Unknown state property: ' + property);
        } else {
            return value;
        }
    }

    set (property, value, silent = false) {

        if (this.get(property) !== value) {
            this.state[property] = value;

            if (!silent) {
                this.triggerChange(property);
            }
        }

        return value;
    }

    apply (property, key, keyValue, silent = false) {

        const value = this.get(property);
        if (value[key] !== keyValue) {
            value[key] = keyValue;

            if (!silent) {
                this.triggerChange(property);
            }
        }
    }

    onChange = (listener) => {

        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(item => item !== listener);
        };
    }

    triggerChange (name) {

        const value = this.get(name);

        for (let listener of this.listeners) {
            listener(name, value);
        }
    }

}