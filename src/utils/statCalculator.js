// batter

export function calAVG(h, ab) {
    const t = h / ab;

    if(isNaN(t) || !isFinite(t)) {
        return Number(0).toFixed(3);
    }

    return t.toFixed(3);
}

// pitcher

export function calERA(er, ip) {
    let temp = (er * 27 / ip).toFixed(2);

    if(temp > 99.99) {
        return 99.99;
    }
    else if(isNaN(temp)) {
        return Number(0).toFixed(2);
    }

    return temp;
}

export function calKRate(k, ip) {
    const temp = k * 27 / ip;

    return temp.toFixed(1);
}

export function calBBRate(bb, ip) {
    return calKRate(bb, ip);
}

export function formatInning(ip) {
    let I = parseInt(ip / 3);
    let i = ip % 3;

    if (i > 0) {
        I += '.' + i;
    }

    return I;
}
