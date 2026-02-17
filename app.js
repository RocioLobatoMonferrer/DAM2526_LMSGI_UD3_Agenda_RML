/**
 * FORMULARIO
 */
const formContacto = document.querySelector("#formContacto");
/**
 * INPUTS
 */
const inpNombre = document.querySelector("#inpNombre");
const inpApellidos = document.querySelector("#inpApellidos");
const inpTelNumero = document.querySelector("#inpTelNumero");
/**
 * BOTONES
 */
const btnAddTel = document.querySelector("#btnAddTel");
const btnGuardarContacto = document.querySelector("#btnGContacto");
const btnBorrarTodo = document.querySelector("#btnBorrarTodo");
const btnLimpiar = document.querySelector("#btnLimpiar");
/**
 * LISTA
 */
const listaTel = document.querySelector("#listaTel");
/**
 * MENSAJE
 */
const mensaje = document.querySelector("#msg");

/**
 * VARIABLES GLOBALES
 */
let telefonos = [];
let nombres = [];
let apellidos = [];
let contactos = [];

/**
 * FUNCIONES
 */
function init() {
    formContacto.addEventListener("submit", function(event) {
        event.preventDefault();
    });
    btnAddTel.addEventListener("click", () => {
        if(!validad()) {
            return;
        }
        agregarTelefono();
        render();
    });
    btnGuardarContacto.addEventListener("click", function(event) {
        event.preventDefault();
        if(!validad()) {
            return;
        }
        crearContacto();
    });
    btnLimpiar.addEventListener("click", () => {

    });
    btnBorrarTodo.addEventListener("click", () => {

    });
}

init();

function validad(){
   if (!inpNombre.checkValidity()) {
        inpNombre.reportValidity();
        return false;
    }

    if (!inpApellidos.checkValidity()) {
        inpApellidos.reportValidity();
        return false;
    }
    if(!inpTelNumero.checkValidity()) {
        inpTelNumero.reportValidity();
        return false;
    }
    return true;
}

function agregarTelefono(){
    telefonos.push(inpTelNumero.value);
    inpTelNumero.value = ""; 
    pintarLista();
}

function agregarNombre() {
    nombres.push(inpNombre.value);
    inpNombre.value = "";
}

function agregarApellidos() {
    apellidos.push(inpApellidos.value);
    inpApellidos.value = "";
}

function pintarLista() {
    listaTel.textContent = "";
    for(let i = 0; i < telefonos.length; i++) {
        const li = document.createElement("li");
        li.textContent = telefonos[i];
        listaTel.appendChild(li);
    }
}

function crearContacto() {
    if (telefonos.length === 0) {
        alert("Añade al menos un teléfono.");
        return null;
    }
    const contacto = {
        nombre: [...nombres],
        apellidos: [...apellidos],
        telefonos: [...telefonos]
    };

    return contacto;
}

function insertarContacto() {
    
}

/**function crearContacto() {
    let nombre = inpNombre.value;
    let apellidos = inpApellidos.value;
    agregarTelefono();
    if (tel.children.length === 0) {
        alert("Añade al menos 1 teléfono.");
        return;
    } else {
        let contacto = 
    {
        id: "",
        nombre:nombre,
        apellidos:apellidos,
        telefonos:tel,
    };
    }

    return contacto;
}*/

function render(){
    pintarLista();
    localStorage.setItem("contacto",JSON.stringify(crearContacto()));
}

