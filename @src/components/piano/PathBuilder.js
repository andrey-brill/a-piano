

export class PathBuilder {

    constructor () {
        this.data = [];
    }

    push (v) {
        this.data.push(v);
        return this;
    }

    M (x, y) {
        return this.push(`M${x},${y}`);
    }

    v (v) {
        return this.push(`v${v}`);
    }

    h (h) {
        return this.push(`h${h}`);
    }

    a (rx, ry, flag = 0) {
        const r = Math.abs(rx);
        return this.push(`a ${r} ${r} 0 0 ${flag} ${rx},${ry}`)
    }

    close () {
        return this.push('z');
    }
    build () {
        return this.data.join(' ');
    }

}