async function sleep(time){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

console.log(1111);
await sleep(2000)
console.log(1111);

