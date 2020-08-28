const fs = require('fs');

let listadoTareas = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoTareas);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se guardo tarea', err);
    });

}

const cargarDB = () => {

    try {
        listadoTareas = require('../db/data.json');

    } catch (error) {
        listadoTareas = [];
    }

}

const getListado = () => {

    cargarDB();
    return listadoTareas;
}

const crear = (descripcion) => {
    cargarDB();
    let tarea = {
        descripcion,
        completado: false
    };

    listadoTareas.push(tarea);
    guardarDB();

    return tarea;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    let index = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoTareas[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListadoTareas = listadoTareas.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoTareas.length === nuevoListadoTareas.length) {
        //listadoTareas.splice(index, 1);
        return false;
    } else {
        listadoTareas = nuevoListadoTareas;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}