// ex. 1
// Promise['Method'] -> ~ all that always returns either it's success or error
// [ 'success', 'error' ]

const success = new Promise((res, rej) => {
    res('success')
})

const success2 = new Promise((res, rej) => {
    setTimeout(() => {
        res("success2")
    }, 500)
})

const error = new Promise((res, rej) => {
    rej("error")
})

Promise.allSettled([success, error]).then(mes => console.log(mes))

// ex. 2
// differences between  Promise.race()  VS  Promise.any();
// with words / examples

// .race() returns first resolved or rejected promise,
Promise.race([success2, error])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // error, because success has timeout

// .any() returns first resolved promise
Promise.any([success2, error])
    .then(res => console.log(res))
    .catch(err => console.log(err)) // success, because it returns only resolved promise

// ex. 3
// add error handling for fetch (based on statuses, ok property)

fetch('https://jsonplaceholder.typicode.com/post')
  .then(res => {
      if(!res.ok || res.status === 404) throw new Error('Request error')

      return res.json()
  })
    .then(res => console.log(res))
    .catch(err => console.log(err))

// ex. 4
// write a promisify function,
// like a wrapper for other functions

// you should pass a callback to it, and arguments to that callback

const asyncFunc = async (args) => {
    const res = await args.map(item => fetch(`https://jsonplaceholder.typicode.com/post/${item}`))
    return await Promise.all(res)
}

const promisify = async (functionAsCallback, ...argsToFunction) => {
    const successRequests = []
    const argsLength = argsToFunction.flat().length

    await functionAsCallback(...argsToFunction)
        .then(res => {
            res.forEach(item => (item.ok || item.status === 200) && successRequests.push(item))
        }).catch(err => console.log(err))

    return new Promise((res, rej) => {
        if(successRequests.length === argsLength) {
            res('success')
        } else {
            rej('error')
        }
    })
}

promisify(asyncFunc, [1,2,3])
    .then(res =>  console.log(res, 'res'))
    .catch(err => console.log(err, 'err'))


// it should return a promise, so you can call .then on this function
// const promisifiedFunction = promisify(someAsyncFunction, [args])
// .then(result => {
//   console.log(result)
// })
