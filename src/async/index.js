
const promiseFN = () => {
    return new Promise((resolve,reject) => {
        (true) ? setTimeout(() =>resolve('Async!'),2000) : reject(new Error('Error'));
    })
} 

const asyncFN = async () => {
    const something = await promiseFN();
    console.log(something);
    console.log('Hello!');
}

console.log('Before');
asyncFN();
console.log('After');