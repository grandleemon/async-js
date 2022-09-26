const app = () => {
    const withVar = () => {
        for (var index = 0; index < 5; index += 1) {
            setTimeout(() => console.log(`var idx = ${index}`), 0);
            console.log(`var index withOutSetTimeOut = ${index}`);
        }
    };

    const withLet = () => {
        for (let index = 0; index < 5; index += 1) {
            setTimeout(() => console.log(`let index = ${index}`), 0);
            console.log(`let index withOutSetTimeOut = ${index}`);
        }
    };

    withVar();
    withLet();
};

setTimeout(app, 0);
