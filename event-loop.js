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

// 1. setTimeout -> webApi
// 2. Because of 0 instantly -> callback queue
// 3. app() => call stack
// 4. withVar() -> call stack
// 5. withVar() for loop starts
// 6. setTimeout => webApi => callback queue on every iteration
// 7. var index withOutSetTimeOut = 0
// 8. var index withOutSetTimeOut = 1
// 9. var index withOutSetTimeOut = 2
// 10. var index withOutSetTimeOut = 3
// 11. var index withOutSetTimeOut = 4
// 12. withLet() => call stack
// 13. withLet() for loop starts
// 14. setTimeout => webApi => callback queue
// 15. let index withOutSetTimeOut = 0
// 16. let index withOutSetTimeOut = 1
// 17. let index withOutSetTimeOut = 2
// 18. let index withOutSetTimeOut = 3
// 19. let index withOutSetTimeOut = 4
// 20. withVar() setTimeout => call stack
// 21. var idx = 5, setTimeout runs only after loop finishes and index is already equal to 5,
// and because of closure console.log has access only to the 5
// 22. var idx = 5
// 23. var idx = 5
// 24. var idx = 5
// 25. var idx = 5
// 26. withLet() setTimeout => call stack
// 27. let index = 0 because of let keyword separate scope for the code block
// it prints the consecutive variables.
// 28. let index = 1
// 29. let index = 2
// 30. let index = 3
// 31. let index = 4