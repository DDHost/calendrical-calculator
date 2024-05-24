'use strict';

export class Cache {
    #C;
    #maxSize;
    constructor(size = 5) {
        this.#C = new Map();
        this.#maxSize = size;
    }

    add(key, value) {
        if (this.isCached(key)) return false;
        this.#C.set(key, value);
        if (this.#C.size > this.#maxSize) this.#C.delete(this.#C.keys().next().value);
    }

    get(key) {
        return this.#C.get(key);
    }

    isCached(key) {
        return !!this.#C.get(key);
    }

    get allCached() {
        return Array.from(this.#C, ([name, value]) => ({ name, value }));
    }
}
