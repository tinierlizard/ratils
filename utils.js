export function isOneOf(a, b) {
    for (x of b) {
        console.log(x, a, a == x);
        if (a == x) {
            return true;
        }
    }

    return false;
}