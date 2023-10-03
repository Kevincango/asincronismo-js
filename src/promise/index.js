const promise = new Promise( function (resolve,reject){
    if(true){
        resolve('Hey!');
    }else{
        reject('error');
    }
})

const cows = 15;

const cowCount = new Promise((resolve,reject) => {
    if(cows > 10){
        resolve(`We have ${cows} cows in the farm`);
    }else{
        reject('We dont have enough cows in the farm');
    }
})

cowCount.then((result) => console.log(result))
.catch((error) => console.log(error))
.finally(()=> console.log('Finally!'))