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
        //Creamos un template para mostrar que algun parametro fue omitido
        resultado.innerHTML = `
        <p class='alert alert-danger'>Al parecer no llenaste el formato correctamente</p>
        `
        //removemos despues de 4 segundos
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
                //Obtenemos la traduccion
                const traduccion = JSON.parse(this.responseText);
                textContent = traduccion.contents.translated;

                //Hacemos el source de la imagen
                imagenSrc = 'img/' + traduccion.contents.translation + '.jpg';
                //Hacemos el template del html
                resultado.innerHTML = `
                <div class="d-flex justify-content-center">
                    <img src="${imagenSrc}" alt="photo">
                </div>
                <p class='d-flex justify-content-center alert alert-secondary'>${textContent}</p>
                `
            } else{
                //Creamos un template para alertar que la conexion fallo
                resultado.innerHTML = `
                <p class='alert alert-warning'>Hubo un problema en la conexion. Intentalo mas tarde</p>
                `
                //Lo eliminamos despues de 4 segundos
                setTimeout(function(){
                    document.querySelector('.alert.alert-warning').remove();
                }, 4000);

            }
        }
        //Enviamos el request
        xhr.send();
    }
})