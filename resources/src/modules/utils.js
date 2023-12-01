export function countDecimals(val) {
    if (Math.floor(val.valueOf()) === val.valueOf()) return 0;
    return val.toString().split(".")[1].length || 0;
}
