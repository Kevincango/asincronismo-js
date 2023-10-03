// Se importa el módulo 'xmlhttprequest' para realizar peticiones HTTP.
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Se define la URL base de la API a la que se realizarán las solicitudes.
const API = 'https://api.escuelajs.co/api/v1';

// Se declara la función 'fetchData' que acepta una URL y una función callback como parámetros.
function fetchData(urlApi, callback) {
  // Se crea un nuevo objeto 'XMLHttpRequest'.
  let xhttp = new XMLHttpRequest();

  // Se inicializa una solicitud HTTP GET a la URL proporcionada, con el tercer parámetro en 'true' para hacer la solicitud de forma asíncrona.
  xhttp.open('GET', urlApi, true);

  // Se define una función para manejar los cambios en el estado de la solicitud HTTP.
  xhttp.onreadystatechange = function (event) {
    // Se verifica si la solicitud ha completado todas las operaciones (readyState === 4).
    if (xhttp.readyState === 4) {
      // Si el código de estado HTTP es 200 (OK), se llama a la función callback con el primer parámetro como 'null' (sin error) y el segundo parámetro como el cuerpo de la respuesta parseado a JSON.
      if(xhttp.status === 200) {
        callback(null, JSON.parse(xhttp.responseText));
      }else { // Si el status no es 200...
        // Se crea un nuevo objeto de error y se llama a la función callback con el objeto de error como primer parámetro y 'null' como el segundo parámetro.
        const error = new Error('Error:' + urlApi);
        return callback(error, null);
      }
    }
  }

  // Se envía la solicitud HTTP.
  xhttp.send();
}

// Llamado principal a la función fetchData. Se le pasa como primer argumento la URL a la que se hará la primera solicitud HTTP.
// Además, se le pasa una función callback como segundo argumento que se ejecutará cuando la solicitud HTTP se complete.
fetchData(`${API}/products`, function(error1, data1) {
    // Se verifica si ocurrió un error en la primera solicitud HTTP. Si hay un error, se muestra en la consola y se finaliza la ejecución.
    if (error1) return console.error(error1);
    
    // Segunda llamada a fetchData, utilizando un elemento de la respuesta de la primera solicitud para construir la URL.
    // También se pasa una función callback que se ejecutará una vez se complete la segunda solicitud HTTP.
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2) {
        // Se verifica si ocurrió un error en la segunda solicitud HTTP. Si hay un error, se muestra en la consola y se finaliza la ejecución.
        if (error2) return console.error(error2);
        
        // Tercera llamada a fetchData, utilizando un elemento de la respuesta de la segunda solicitud para construir la URL.
        // También se pasa una función callback que se ejecutará una vez se complete la tercera solicitud HTTP.
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3) {
            // Se verifica si ocurrió un error en la tercera solicitud HTTP. Si hay un error, se muestra en la consola y se finaliza la ejecución.
            if (error3) return console.error(error3);
            
            // Si todas las solicitudes HTTP se completan con éxito, se imprimen en consola ciertos elementos de las respuestas obtenidas.
            console.log(data1[1]); // Se imprime el segundo elemento de la respuesta de la primera solicitud HTTP.
            console.log(data2.title); // Se imprime el título de la respuesta de la segunda solicitud HTTP.
            console.log(data3.name); // Se imprime el nombre de la respuesta de la tercera solicitud HTTP.
        });
    });
});

