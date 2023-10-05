import fetch from "node-fetch";

const API = 'https://api.escuelajs.co/api/v1';

async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json()
    return data;
}

async function* anotherFn(urlApi){
    try{
        const products = await fetchData(`${urlApi}/products`);
        const product = await fetchData(`${urlApi}/products/${products[0].id}`);
        const category = await fetchData(`${urlApi}/categories/${product.category.id}`);

        yield console.log(products)
        yield console.log(product.title);
        yield console.log(category.name);
    }catch(error){
        console.error(error);
    }
}

const g = anotherFn(API);
g.next();
g.next();
g.next();