firebase.initializeApp({
    apiKey: "AIzaSyBoNBwm1tv0ywT1L8PWeRubau7W4TZ8QMc",
    authDomain: "retokodemia.firebaseapp.com",
    projectId: "retokodemia"
});

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

//agregando los datos a la coleccion
function registrar(){

    //obtener el valor de cada input
    let nombre = document.getElementById('nombre').value
    let edad = document.getElementById('edad').value
    let telefono = document.getElementById('telefono').value
    let correo = document.getElementById('correo').value
    let direccion = document.getElementById('direccion').value

    db.collection("personas").add({
            name: nombre,
            age: edad,
            phone: telefono,
            email: correo,
            address: direccion
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

//leer los datos para poderlos imprimir

var arreglo = document.getElementById("registros")
db.collection("personas").onSnapshot((querySnapshot) => {
    arreglo.innerHTML = "" //limpiar 
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);

        arreglo.innerHTML += `
        <tr>
            <td>${doc.data().name}</td>
            <td>${doc.data().age}</td>
            <td>${doc.data().phone}</td>
            <td>${doc.data().email}</td>
            <td>${doc.data().address}</td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().age}','${doc.data().phone}','${doc.data().email}','${doc.data().address}')">Editar</button></td>
            <td><button class="btn btn-danger" onclick="borrar('${doc.id}')">Eliminar</button></td>
        </tr>`
    });
});
//Editar datos existentes

function editar(indice, name, age, phone, email, address) {

    //obtener el valor de cada input
    let nombre = document.getElementById('nombre').value = name
    let edad = document.getElementById('edad').value = age
    let telefono = document.getElementById('telefono').value = phone
    let correo = document.getElementById('correo').value = email
    let direccion = document.getElementById('direccion').value = address

    let btn = document.getElementById('boton')
    btn.innerHTML = 'Editando'

    btn.onclick = function () {
        let personasRef = db.collection("personas").doc(indice);

        //obtener el valor de cada input
        let nombre = document.getElementById('nombre').value
        let edad = document.getElementById('edad').value
        let telefono = document.getElementById('telefono').value
        let correo = document.getElementById('correo').value
        let direccion = document.getElementById('direccion').value

        return personasRef.update({
                name: nombre,
                age: edad,
                phone: telefono,
                email: correo,
                address: direccion
            })
            .then(function () {
                console.log("Document successfully updated!");
                btn.innerHTML = 'Guardar'

                document.getElementById('nombre').value = ''
                document.getElementById('edad').value = ''
                document.getElementById('telefono').value = ''
                document.getElementById('correo').value = ''
                document.getElementById('direccion').value = ''
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}
//borrar datos de la coleccion

function borrar(indice) {
    db.collection("personas").doc(indice).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}