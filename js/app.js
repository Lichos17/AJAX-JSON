//Obtenemos el formulario y donde insertaremos nuestros resultados
const traducir = document.getElementById('traducir')
const resultado = document.getElementById('resultado');

//Añadimos un Event Listener para cuando se envie el formulario
traducir.addEventListener('submit', function(e){
    e.preventDefault();

    //Obtenemos el idioma seleccionado y el texto a traducir
    const idioma = document.getElementById('idioma');
    const idiomaSeleccionado = idioma.options[idioma.selectedIndex].value;

    const texto = document.getElementById('texto').value;
    //Declaramos el end point
    let url = 'https://api.funtranslations.com/translate/';

    //Checamos que ningun parametro haya sido omitido
    if(texto === '' || idiomaSeleccionado === ''){
        //Creamos un parrafo para mostrar que algun parametro fue omitiod
        const alerta = document.createElement('p');
        alerta.className = 'alert alert-danger'
        alerta.textContent = 'Al parecer no llenaste el formulario correctamente, intentalo de nuevo!';
        //Lo añadimos a nuestro html y removemos despues de 4 segundos
        resultado.appendChild(alerta);
        setTimeout(function(){
            document.querySelector('.alert.alert-danger').remove();
        }, 4000);
    } else{
        //Le agregamos los parametros a nuestra URL
        url += idiomaSeleccionado + '.json?text=' + texto;
        //Creamos el request 
        xhr = new XMLHttpRequest();
        //Iniciamos la conexion
        xhr.open('GET', url, true);
        //Imprimimos el template
        xhr.onload = function(){
            if(this.status === 200){
                //Obtenemos la traduccion y creamos un parrafo
                const traduccion = JSON.parse(this.responseText);
                const correcto = document.createElement('p');
                correcto.className = 'alert alert-secondary'
                correcto.textContent = traduccion.contents.translated;
                //Creamos una imagen conforme a la traduccion
                const imagen = document.createElement('img');
                imagen.src = 'img/' + traduccion.contents.translation + '.jpg';
                //Lo añadimos al template
                resultado.appendChild(imagen);
                resultado.appendChild(correcto);
            } else{
                //Creamos un parrafo para alertar que la conexion fallo
                const alertApi = document.createElement('p');
                alertApi.className = 'alert alert-warning'
                alertApi.textContent = 'Algo salio mal con el request. Intentalo mas tarde';
                //Añadimos al template y removemos despues de 4 segundos
                resultado.appendChild(alertApi);
    
                setTimeout(function(){
                    document.querySelector('.alert.alert-warning').remove();
                }, 4000);

            }
        }
        //Enviamos el request
        xhr.send();
    }
})