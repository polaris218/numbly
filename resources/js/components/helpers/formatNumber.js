export default num => {
    if (typeof num !== 'number') {
        return num;
    }

    const abs = Math.abs(num);
    const sign = Math.sign(num);

    if (abs > 999999) {
        return sign * (abs / 1000).toFixed(1) + 'M';
    }
    if (abs > 999) {
        return sign * (abs / 1000).toFixed(1) + 'K';
    }
    return sign * abs;
};