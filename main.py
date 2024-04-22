# app.py
from flask import Flask, render_template, request, jsonify
import sqlite3
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Ruta principal para renderizar el template del formulario
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para procesar la solicitud POST del formulario de turnos y guardar el turno en la base de datos
@app.route('/api/turnos', methods=['POST'])
def guardar_turno():
    nombre = request.form['nombre']
    fecha = request.form['fecha']
    hora = request.form['hora']
    telefono = request.form['telefono']
    mail = request.form['mail']

    # Conexión a la base de datos
    conn = sqlite3.connect('turnos.db')
    cursor = conn.cursor()

    # Insertar el nuevo turno en la base de datos
    cursor.execute("INSERT INTO turnos (nombre, fecha, hora, telefono, correo) VALUES (?, ?, ?, ?, ?)", (nombre, fecha, hora, telefono, mail))
    conn.commit()

    # Cerrar conexión
    conn.close()

    # Devolver una respuesta JSON
    return jsonify({'message': 'Turno guardado correctamente'})

# Ruta para visualizar los turnos y obtenerlos en formato JSON
@app.route('/api/verturnos')
def visualizar_turnos():
    # Conexión a la base de datos
    conn = sqlite3.connect('turnos.db')
    cursor = conn.cursor()

    # Obtener los turnos de la base de datos
    cursor.execute("SELECT * FROM turnos")
    turnos = cursor.fetchall()

    # Convertir los turnos en una lista de diccionarios para que sea serializable en JSON
    turnos_dict_list = []
    for turno in turnos:
        turno_dict = {
            'nombre': turno[0],
            'fecha': turno[1],
            'hora': turno[2],
            'telefono': turno[3],
            'correo': turno[4]
        }
        turnos_dict_list.append(turno_dict)

    # Cerrar conexión
    conn.close()

    # Devolver una respuesta JSON con la lista de turnos
    return jsonify(turnos_dict_list)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
