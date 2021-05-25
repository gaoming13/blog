function pick(x) {
    if (typeof x === 'object') {
        return 1;
    }
    else if (typeof x === 'number') {
        return {};
    }
    return true;
}
