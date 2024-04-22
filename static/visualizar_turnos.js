document.addEventListener('DOMContentLoaded', function() {
    console.log('visualizar turnos')
    fetch('http://127.0.0.1:5000/api/verturnos')
    .then(response => response.json())
    .then(data => {
        console.log('data')
        var turnosTable = document.getElementById('turnos-table');
        var tableHTML = '<table><thead><tr><th>Nombre</th><th>Fecha</th><th>Hora</th><th>Teléfono</th><th>Correo</th></tr></thead><tbody>';
        
        data.forEach(turno => {
            tableHTML += `<tr><td>${turno.nombre}</td><td>${turno.fecha}</td><td>${turno.hora}</td><td>${turno.telefono}</td><td>${turno.correo}</td></tr>`;
        });
        
        tableHTML += '</tbody></table>';
        turnosTable.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
