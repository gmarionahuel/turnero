document.addEventListener('DOMContentLoaded', function() {
    // Agrega un evento de escucha al formulario cuando se envía
    document.querySelector('form').addEventListener('submit', function(event) {
        // Detiene el comportamiento predeterminado del formulario para evitar que se recargue la página
        event.preventDefault();
        console.log('carga de datos')
        // Obtén los valores del formulario
        var nombre = document.getElementById('nombre').value;
        var fecha = document.getElementById('fecha').value;
        var hora = document.getElementById('hora').value;
        var telefono = document.getElementById('telefono').value;
        var mail = document.getElementById('mail').value;
        // Crea un objeto con los datos del formulario
        var formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('fecha', fecha);
        formData.append('hora', hora);
        formData.append('telefono', telefono);
        formData.append('mail', mail);
        // Envía una solicitud POST al servidor Flask con los datos del formulario
        console.log(formData)
        fetch('http://127.0.0.1:5000/api/turnos', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Muestra un mensaje de éxito en la consola del navegador
            limpiarDatos()
        })
        .catch(error => {
            // Muestra un mensaje de error en la consola del navegador si ocurre un error
            console.error('Error:', error);
        });
    });
    
});


function limpiarDatos(){
document.getElementById('nombre').value = '';;
document.getElementById('fecha').value = '';;
document.getElementById('hora').value = '';;
document.getElementById('telefono').value = '';;
document.getElementById('mail').value = '';;

}