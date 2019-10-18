export function ready(cb: () => void) {
    document.onreadystatechange = function () {
        console.log(document.readyState);
        if (document.readyState === 'interactive') {
            cb();
        }
    };
}
