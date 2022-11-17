// interval is half of par1
async function asyncParallel1(par1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (par1 / 2 > 10000) {
                reject(new Error('Parallel #1 timed out!'))
            } else {
                resolve(true)
            }
        }, par1 / 2)
    })
}

// interval is 1/3rd of par1
async function asyncParallel2(par1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (par1 / 3 > 10000) {
                reject(new Error('Parallel #2 timed out!'))
            } else {
                resolve(true)
            }
        }, par1 / 3)
    })
}

// interval is 1/4rd of par1
async function asyncParallel3(par1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (par1/ 4 > 10000) {
                reject(new Error('Parallel #3 timed out!'))
            } else {
                resolve(true)
            }
        }, par1 / 4)
    })
}

async function runAsyncParallels(par1) {
    Promise.allSettled([asyncParallel1(par1), asyncParallel2(par1), asyncParallel3(par1)])
        .then((result) => {
            console.log(`${result[0].value ? result[0].value : result[0].reason}\n${result[1].value ? result[1].value : result[1].reason}\n${result[2].value ? result[2].value : result[2].reason}`)
        })
        .catch((error) => {
            console.log(error)
        })
}

async function asyncPromise(par1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof par1 !== 'number') {
                reject(new TypeError('Par 1 is invalid'))
            }
            if (par1 < 0 || par1 > 50000) {
                reject(new RangeError('Parameter value out of range'))
            }
            if (1000 + par1 > 25000) {
                reject(new Error('Server Timeout'))
            } else {
                resolve(par1 * 2)
            }
        }, 1000 + par1)
    })
}

function asyncCB(par1, cb) {
    asyncPromise(par1)
        .then((result) => {
            cb(null, result)
            asyncCB(result, cb)
        })
        .catch((error) => {
            cb(error, null)
        })
    runAsyncParallels(par1)
}

function myCallback(err, result) {
	if (err) {
		console.log(`ERR: ${err.message}`);
    } else {
        console.log(`SUCCESS: ${result}`);
    }
}

asyncCB(30, myCallback)
